import React, { useState, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import type { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch'
import { motion, AnimatePresence } from 'framer-motion'
import { IconPlus, IconTrash, IconEdit, IconCheck } from '@tabler/icons-react'
import type { Note } from '../../../types/room.types'
import NoteCard from '../Note/Note'

interface CanvasProps {
    notes: Note[]
    scale: number
    onAddNote: (
        type: 'text' | 'todo' | 'image',
        x: number,
        y: number,
        content?: string | any, // Adjusted to match Room.tsx
        width?: number,
        height?: number
    ) => void
    onUpdateNote: (id: string, updates: Partial<Note>) => void
    onDeleteNote: (id: string) => void
    onDuplicateNote: (id: string) => void
    onClearCanvas: () => void
    onScaleChange: (scale: number) => void
}

const Canvas: React.FC<CanvasProps> = ({
    notes,
    scale,
    onAddNote,
    onUpdateNote,
    onDeleteNote,
    onDuplicateNote,
    onClearCanvas,
    onScaleChange,
}) => {
    const [contextMenu, setContextMenu] = useState<{
        x: number
        y: number
        canvasX: number
        canvasY: number
    } | null>(null)

    const canvasRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const uploadPosRef = useRef<{ x: number; y: number } | null>(null)
    const transformRef = useRef<ReactZoomPanPinchRef>(null)

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        const { clientX, clientY } = e

        let canvasX = clientX
        let canvasY = clientY

        if (transformRef.current && canvasRef.current) {
            const { positionX, positionY, scale } =
                transformRef.current.instance.transformState
            const rect = canvasRef.current.getBoundingClientRect()

            canvasX = (clientX - rect.left - positionX) / scale
            canvasY = (clientY - rect.top - positionY) / scale
        }

        setContextMenu({ x: clientX, y: clientY, canvasX, canvasY })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file || !uploadPosRef.current) return

        const { x, y } = uploadPosRef.current
        uploadPosRef.current = null
        setContextMenu(null)

        // Pass the file object directly. 
        // Validation and upload will be handled in Room.tsx/room-notes.service
        onAddNote('image', x, y, file)

        e.target.value = ''
    }

    return (
        <div
            ref={canvasRef}
            className="relative flex-1 bg-background-500 overflow-hidden"
            onContextMenu={handleContextMenu}
            onClick={() => setContextMenu(null)}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
            />

            <TransformWrapper
                ref={transformRef}
                minScale={0.2}
                maxScale={4}
                limitToBounds={false}
                doubleClick={{ disabled: true }}
                panning={{ activationKeys: [' '] }} // 🔥 FIX CLAVE
                onTransformed={(ref) => onScaleChange(ref.state.scale)}
            >
                <TransformComponent
                    wrapperStyle={{ width: '100%', height: '100%' }}
                    contentStyle={{ width: '8000px', height: '8000px' }}
                >
                    <div className="relative w-full h-full">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                scale={scale}
                                onUpdate={(u) => onUpdateNote(note.id, u)}
                                onDelete={() => onDeleteNote(note.id)}
                                onDuplicate={() => onDuplicateNote(note.id)}
                            />
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>

            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="fixed z-[9999] w-64 rounded-[28px] bg-black/80 backdrop-blur-2xl border border-white/10 p-1.5 shadow-2xl overflow-hidden"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col gap-0.5">
                            <button
                                className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-[24px] transition-all group"
                                onClick={() => {
                                    onAddNote('text', contextMenu.canvasX, contextMenu.canvasY)
                                    setContextMenu(null)
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-inner">
                                    <IconEdit size={20} className="text-white/60 group-hover:text-white" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold tracking-tight">Create Note</span>
                                    <span className="text-[10px] text-white/40 font-medium">Quick thoughts & ideas</span>
                                </div>
                            </button>

                            <button
                                className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-[24px] transition-all group"
                                onClick={() => {
                                    onAddNote('todo', contextMenu.canvasX, contextMenu.canvasY)
                                    setContextMenu(null)
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-inner">
                                    <IconCheck size={20} className="text-white/60 group-hover:text-white" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold tracking-tight">Create To-do</span>
                                    <span className="text-[10px] text-white/40 font-medium">Tasks & checklists</span>
                                </div>
                            </button>

                            <button
                                className="flex items-center gap-4 w-full px-4 py-3.5 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-[24px] transition-all group"
                                onClick={() => {
                                    uploadPosRef.current = {
                                        x: contextMenu.canvasX,
                                        y: contextMenu.canvasY,
                                    }
                                    fileInputRef.current?.click()
                                    setContextMenu(null)
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors shadow-inner">
                                    <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold tracking-tight">Add Image</span>
                                    <span className="text-[10px] text-white/40 font-medium">Upload from device</span>
                                </div>
                            </button>

                            <div className="h-px bg-white/5 my-2 mx-4" />

                            <button
                                className="flex items-center gap-4 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-[24px] transition-all group"
                                onClick={() => {
                                    if (confirm('Clear entire canvas?')) {
                                        onClearCanvas()
                                    }
                                    setContextMenu(null)
                                }}
                            >
                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                    <IconTrash size={20} className="text-red-400" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="font-bold tracking-tight text-red-400">Clear Canvas</span>
                                    <span className="text-[10px] text-red-400/40 font-medium">Delete all items</span>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Canvas
