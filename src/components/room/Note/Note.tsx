import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconEdit, IconCheck, IconSquare, IconPlus, IconTrash } from '@tabler/icons-react';
import type { Note, TodoItem } from '../../../types/room.types';
import { cn } from '../../../utils/cn';
import { formatDistanceToNow } from 'date-fns';

interface NoteCardProps {
    note: Note;
    onUpdate: (updates: Partial<Note>) => void;
    onDelete: () => void;
    onDuplicate: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onUpdate, onDelete, onDuplicate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const closeMenu = () => {
        setContextMenu(null);
        setShowColorPicker(false);
    };

    const colors = [
        '#818CF8', '#3B82F6', '#22D3EE', '#F1F5F9', '#FEF9C3',
        '#CFFAFE', '#FEE2E2', '#DCFCE7', '#E0F2FE', '#DBEAFE'
    ];

    const toggleTodo = (todoId: string) => {
        if (note.type !== 'todo' || !Array.isArray(note.content)) return;
        const newTodos = note.content.map(t =>
            t.id === todoId ? { ...t, completed: !t.completed } : t
        );
        onUpdate({ content: newTodos });
    };

    const handleAddTodo = () => {
        if (note.type !== 'todo' || !Array.isArray(note.content)) return;
        const newTodo: TodoItem = { id: Date.now().toString(), text: '', completed: false };
        onUpdate({ content: [...note.content, newTodo] });
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);

        const startY = e.clientY;
        const startHeight = note.height || 180;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const newHeight = Math.max(100, Math.min(600, startHeight + (moveEvent.clientY - startY)));
            onUpdate({ height: newHeight });
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <motion.div
            drag={!isEditing && !isResizing}
            dragMomentum={false}
            onDragEnd={(_, info) => {
                onUpdate({
                    x: note.x + info.offset.x,
                    y: note.y + info.offset.y
                });
            }}
            // Stop propagation to prevent canvas from panning when clicking/dragging a note
            onPointerDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "absolute rounded-[24px] shadow-xl group transition-shadow hover:shadow-2xl border flex flex-col",
                note.type === 'image' ? "border-transparent bg-transparent" : "border-white/10 p-5 min-w-[240px] max-w-[320px]",
                !isEditing ? "cursor-grab active:cursor-grabbing" : "cursor-default",
                isResizing && "cursor-ns-resize"
            )}
            onContextMenu={handleContextMenu}
            onClick={closeMenu}
            style={{
                left: note.x,
                top: note.y,
                width: note.type === 'image' ? (note.width || 300) : (note.width || 280),
                height: note.type === 'image' ? (note.height || 'auto') : (note.height || 'auto'),
                minHeight: note.type === 'image' ? 'auto' : '140px',
                backgroundColor: note.type === 'image' ? 'transparent' : note.color,
                color: '#1A1A1E'
            }}
        >
            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed z-[1000] bg-[#0A0A0B]/90 border border-white/5 rounded-[24px] shadow-2xl w-64 backdrop-blur-xl overflow-hidden"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col py-1">
                            {!showColorPicker ? (
                                <>
                                    <button
                                        onClick={() => { onDuplicate(); closeMenu(); }}
                                        className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 text-white transition-all text-base font-medium group"
                                    >
                                        <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                        <span>Duplicate note</span>
                                    </button>
                                    <div className="h-[1px] bg-white/5 mx-4" />
                                    {note.type !== 'image' && (
                                        <>
                                            <button
                                                onClick={() => setShowColorPicker(true)}
                                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 text-white transition-all text-base font-medium group"
                                            >
                                                <div className="w-5 h-5 rounded-full" style={{ backgroundColor: note.color }} />
                                                <span>Change color</span>
                                            </button>
                                            <div className="h-[1px] bg-white/5 mx-4" />
                                        </>
                                    )}
                                    <button
                                        onClick={() => { onDelete(); closeMenu(); }}
                                        className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-500/10 text-[#FF4B4B] transition-all text-base font-medium group"
                                    >
                                        <IconTrash size={20} className="text-[#FF4B4B]" />
                                        <span>Delete note</span>
                                    </button>
                                </>
                            ) : (
                                <div className="p-4">
                                    <h4 className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-3">select color</h4>
                                    <div className="grid grid-cols-5 gap-2">
                                        {colors.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => { onUpdate({ color: c }); closeMenu(); }}
                                                className="w-8 h-8 rounded-full border border-white/10 hover:scale-110 transition-transform"
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setShowColorPicker(false)}
                                        className="w-full mt-4 text-[10px] uppercase font-bold text-white/40 hover:text-white/60 transition-colors"
                                    >
                                        Back
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {note.type !== 'image' && (
                <div className="flex items-center justify-between mb-4">
                    {isEditing ? (
                        <textarea
                            autoFocus
                            value={note.title}
                            onChange={(e) => onUpdate({ title: e.target.value })}
                            onBlur={() => setIsEditing(false)}
                            onPointerDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="bg-black/5 rounded px-1 font-bold text-base w-full focus:outline-none resize-none overflow-hidden"
                            rows={1}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                    ) : (
                        <div className="flex items-center gap-2 group/title cursor-text w-full" onClick={() => setIsEditing(true)}>
                            <h4 className="font-bold text-base whitespace-pre-wrap break-words flex-1">{note.title}</h4>
                            <IconEdit size={16} className="text-black/40 opacity-0 group-hover/title:opacity-100 transition-opacity shrink-0" />
                        </div>
                    )}
                </div>
            )}

            <div className={cn("flex-1 flex flex-col min-h-0 overflow-hidden", note.type === 'image' && "bg-transparent")}>
                {note.type === 'text' ? (
                    <textarea
                        value={note.content as string}
                        onChange={(e) => onUpdate({ content: e.target.value })}
                        onFocus={() => setIsEditing(true)}
                        onBlur={() => setIsEditing(false)}
                        onPointerDown={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        placeholder="Type something..."
                        className="bg-transparent border-none w-full flex-1 resize-none focus:outline-none placeholder:text-black/20"
                        style={{ cursor: 'text' }}
                    />
                ) : note.type === 'todo' ? (
                    <div className="space-y-2 overflow-y-auto pr-1 flex-1 custom-scrollbar" onPointerDown={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                        {(note.content as TodoItem[]).map(todo => (
                            <div key={todo.id} className="flex items-center gap-2 group/item">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className={cn(
                                        "shrink-0 transition-colors",
                                        todo.completed ? "text-primary-600" : "text-black/20 hover:text-black/40"
                                    )}
                                >
                                    {todo.completed ? <IconCheck size={18} /> : <IconSquare size={18} />}
                                </button>
                                <input
                                    value={todo.text}
                                    onFocus={() => setIsEditing(true)}
                                    onBlur={() => setIsEditing(false)}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const newTodos = (note.content as TodoItem[]).map(t =>
                                            t.id === todo.id ? { ...t, text: e.target.value } : t
                                        );
                                        onUpdate({ content: newTodos });
                                    }}
                                    placeholder="Task..."
                                    className={cn(
                                        "bg-transparent border-none w-full focus:outline-none",
                                        todo.completed && "line-through opacity-50"
                                    )}
                                    style={{ cursor: 'text' }}
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleAddTodo}
                            onMouseDown={(e) => e.stopPropagation()}
                            className="text-[10px] font-bold uppercase tracking-wider text-black/30 hover:text-black/50 transition-colors pt-2"
                        >
                            + Add Item
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-full relative group/img">
                        <img
                            src={note.content as string}
                            alt="" // Empty alt for decorative/user content
                            className="w-full h-full block select-none pointer-events-none rounded-[24px] object-contain"
                            draggable={false}
                        />
                    </div>
                )}
            </div>

            {note.type !== 'image' && (
                <div className="mt-4 flex items-center justify-between opacity-60 text-[10px] font-bold">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
                        <span>Created {formatDistanceToNow(new Date(note.createdAt))} ago</span>
                    </div>
                </div>
            )}

            {/* Resize Handle */}
            <div
                onMouseDown={handleResizeStart}
                // Adjust resize handle for images
                className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full cursor-ns-resize transition-all z-10",
                    note.type === 'image'
                        ? "bg-white/20 hover:bg-white/40 translate-y-1/2"
                        : "bg-black/10 hover:bg-black/20 -translate-y-1/2"
                )}
            />
        </motion.div>
    );
};

export default NoteCard;
