import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    IconEdit,
    IconCheck,
    IconSquare,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react'
import type { Note, TodoItem } from '../../../types/room.types'
import { cn } from '../../../utils/cn'
import { formatDistanceToNow } from 'date-fns'



interface NoteCardProps {
    note: Note
    scale: number
    onUpdate: (updates: Partial<Note>) => void
    onDelete: () => void
    onDuplicate: () => void
    onTyping?: (isTyping: boolean) => void
}


const NoteCard: React.FC<NoteCardProps> = ({
    note,
    scale,
    onUpdate,
    onDelete,
    onDuplicate,
    onTyping,
}) => {

    const [isEditing, setIsEditing] = useState(false)
    const [isResizing, setIsResizing] = useState(false)
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
    const [showColorPicker, setShowColorPicker] = useState(false)

    // Local state for immediate typing feedback
    const [localTitle, setLocalTitle] = useState(note.title)
    const [localContent, setLocalContent] = useState(note.content)

    // Robust per-instance debounce using useRef
    const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const updateRef = React.useRef(onUpdate);

    // Keep update ref fresh
    useEffect(() => {
        updateRef.current = onUpdate;
    }, [onUpdate]);

    const debouncedUpdate = useCallback((updates: Partial<Note>) => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
            updateRef.current(updates);
        }, 800); // Slightly faster than 1s for better feel
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        };
    }, []);

    // Update local state when remote data changes (unless editing)
    useEffect(() => {
        if (!isEditing) {
            setLocalTitle(note.title)
            setLocalContent(note.content)
        }
    }, [note.title, note.content, isEditing])

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value
        setLocalTitle(val)
        debouncedUpdate({ title: val })
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value
        setLocalContent(val)
        debouncedUpdate({ content: val })
    }

    const stop = (e: React.SyntheticEvent) => {
        e.stopPropagation()
    }

    /* ------------------ TODO HELPERS ------------------ */

    const toggleTodo = (id: string) => {
        if (note.type !== 'todo' || !Array.isArray(note.content)) return
        onUpdate({
            content: note.content.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            ),
        })
    }

    const addTodo = () => {
        if (note.type !== 'todo' || !Array.isArray(note.content)) return
        onUpdate({
            content: [
                ...note.content,
                { id: Date.now().toString(), text: '', completed: false },
            ],
        })
    }

    /* ------------------ RESIZE ------------------ */

    const handleResizeStart = (e: React.MouseEvent) => {
        stop(e)
        setIsResizing(true)

        const startY = e.clientY
        const startHeight = note.height ?? 180

        const move = (ev: MouseEvent) => {
            onUpdate({
                height: Math.max(140, Math.min(600, startHeight + (ev.clientY - startY) / scale)),
            })
        }

        const up = () => {
            setIsResizing(false)
            window.removeEventListener('mousemove', move)
            window.removeEventListener('mouseup', up)
        }

        window.addEventListener('mousemove', move)
        window.addEventListener('mouseup', up)
    }

    /* ------------------ RENDER ------------------ */

    return (
        <motion.div
            drag={!isEditing && !isResizing}
            dragMomentum={false}
            dragListener={!isEditing && !isResizing}
            onDragEnd={(_, info) => {
                // Fix double movement by dividing by scale
                onUpdate({
                    x: note.x + info.offset.x / scale,
                    y: note.y + info.offset.y / scale
                })
            }}
            onPointerDown={stop}
            onMouseDown={stop}
            onTouchStart={stop}
            className={cn(
                'absolute rounded-2xl border shadow-xl flex flex-col select-none',
                note.type === 'image'
                    ? 'border-transparent bg-transparent'
                    : 'border-white/10 p-4 bg-white',
                !isEditing && !isResizing && 'cursor-grab active:cursor-grabbing'
            )}
            style={{
                left: note.x,
                top: note.y,
                width: note.width ?? 280,
                height: note.height ?? 'auto',
                backgroundColor: note.type === 'image' ? 'transparent' : note.color,
            }}
            onContextMenu={(e) => {
                e.preventDefault()
                stop(e)
                setContextMenu({ x: e.clientX, y: e.clientY })
            }}
            onClick={() => setContextMenu(null)}
        >
            {contextMenu && createPortal(
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="fixed z-[9999] w-64 rounded-[28px] bg-black/80 backdrop-blur-2xl border border-white/10 p-1.5 shadow-2xl overflow-hidden"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onMouseDown={stop}
                        onClick={stop}
                    >
                        {!showColorPicker ? (
                            <div className="flex flex-col gap-0.5">
                                <button
                                    className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-[24px] transition-all group text-left"
                                    onClick={() => {
                                        onDuplicate()
                                        setContextMenu(null)
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-inner shrink-0">
                                        <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="font-bold tracking-tight">Duplicate Note</span>
                                        <span className="text-[10px] text-white/40 font-medium">Create a copy</span>
                                    </div>
                                </button>

                                <button
                                    className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-[24px] transition-all group text-left"
                                    onClick={() => setShowColorPicker(true)}
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-inner shrink-0">
                                        <div
                                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                                            style={{ backgroundColor: note.color }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="font-bold tracking-tight">Change Color</span>
                                        <span className="text-[10px] text-white/40 font-medium">Pick a new look</span>
                                    </div>
                                </button>

                                <div className="h-px bg-white/5 my-2 mx-4" />

                                <button
                                    className="flex items-center gap-4 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-[24px] transition-all group text-left"
                                    onClick={() => {
                                        onDelete()
                                        setContextMenu(null)
                                    }}
                                >
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors shrink-0">
                                        <IconTrash size={20} className="text-red-400" />
                                    </div>
                                    <div className="flex flex-col items-start leading-tight">
                                        <span className="font-bold tracking-tight text-red-400">Delete Note</span>
                                        <span className="text-[10px] text-red-400/40 font-medium">Remove permanently</span>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <div className="p-3">
                                <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-3 px-1">select color</div>
                                <div className="grid grid-cols-5 gap-2.5">
                                    {[
                                        '#FEE2E2', '#FEF3C7', '#ECFDF5', '#E0F2FE', '#EDE9FE',
                                        '#FCE7F3', '#F1F5F9', '#FFEDD5', '#DBEAFE', '#818CF8'
                                    ].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                onUpdate({ color: c })
                                                setContextMenu(null)
                                                setShowColorPicker(false)
                                            }}
                                            className="w-9 h-9 rounded-xl border border-white/10 hover:scale-110 hover:border-white/30 transition-all shadow-sm flex items-center justify-center group"
                                            style={{ backgroundColor: c }}
                                        >
                                            {note.color === c && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setShowColorPicker(false)}
                                    className="w-full mt-4 py-2 text-[10px] text-white/40 hover:text-white/60 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>Back</span>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}

            {/* ---------------- IMAGE ---------------- */}
            {note.type === 'image' && (
                <img
                    src={note.content as string}
                    draggable={false}
                    className="w-full h-full object-contain rounded-xl pointer-events-none"
                />
            )}

            {/* ---------------- TITLE ---------------- */}
            {note.type !== 'image' && (
                <div className="relative group/title">
                    <textarea
                        value={localTitle}
                        onChange={handleTitleChange}
                        onFocus={() => {
                            setIsEditing(true)
                            onTyping?.(true)
                        }}
                        onBlur={() => {
                            setIsEditing(false)
                            onTyping?.(false)
                        }}
                        onPointerDown={stop}
                        className="font-bold resize-none bg-transparent outline-none mb-3 w-full text-black placeholder:text-black/40"
                        rows={1}
                        placeholder="Title"
                    />

                    {!isEditing && (
                        <IconEdit
                            size={14}
                            className="absolute right-0 top-1 text-black/20 opacity-0 group-hover/title:opacity-100 transition-opacity"
                        />
                    )}
                </div>
            )}

            {/* ---------------- BODY ---------------- */}
            {note.type === 'text' && (
                <textarea
                    value={localContent as string}
                    onChange={handleContentChange}
                    onFocus={() => {
                        setIsEditing(true)
                        onTyping?.(true)
                    }}
                    onBlur={() => {
                        setIsEditing(false)
                        onTyping?.(false)
                    }}
                    onPointerDown={stop}
                    className="flex-1 resize-none bg-transparent outline-none text-black placeholder:text-black/30"
                    placeholder="Write something…"
                />

            )}

            {note.type === 'todo' && (
                <div className="flex-1 space-y-2">
                    {(note.content as TodoItem[]).map(todo => (
                        <div key={todo.id} className="flex gap-2 items-center">
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                onMouseDown={stop}
                                className={cn(todo.completed ? "text-blue-500" : "text-black/30")}
                            >
                                {todo.completed ? <IconCheck size={18} /> : <IconSquare size={18} />}
                            </button>
                            <input
                                value={todo.text}
                                onChange={(e) =>
                                    onUpdate({
                                        content: (note.content as TodoItem[]).map(t =>
                                            t.id === todo.id ? { ...t, text: e.target.value } : t
                                        ),
                                    })
                                }
                                onFocus={() => {
                                    setIsEditing(true)
                                    onTyping?.(true)
                                }}
                                onBlur={() => {
                                    setIsEditing(false)
                                    onTyping?.(false)
                                }}
                                onPointerDown={stop}
                                className={cn(
                                    "bg-transparent outline-none w-full text-black",
                                    todo.completed && "line-through opacity-50"
                                )}
                            />

                        </div>
                    ))}
                    <button onClick={addTodo} onMouseDown={stop} className="text-xs text-black/40 hover:text-black/60 font-medium pt-1">
                        + Add item
                    </button>
                </div>
            )}

            {/* ---------------- FOOTER ---------------- */}
            {note.type !== 'image' && (
                <div className="text-[10px] text-black/40 mt-3 font-medium">
                    {note.createdAt ? `Created ${formatDistanceToNow(new Date(note.createdAt))} ago` : 'Creating...'}
                </div>
            )}

            {/* ---------------- RESIZE HANDLE ---------------- */}
            <div
                onMouseDown={handleResizeStart}
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-ns-resize"
            />
        </motion.div>
    )
}

export default NoteCard
