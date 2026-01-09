import React, { useState, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import type { Note } from '../../../types/room.types';
import NoteCard from '../Note/Note';
import toast from 'react-hot-toast';

interface CanvasProps {
    notes: Note[];
    onAddNote: (type: 'text' | 'todo', x: number, y: number) => void;
    onUpdateNote: (id: string, updates: Partial<Note>) => void;
    onDeleteNote: (id: string) => void;
    onDuplicateNote: (id: string) => void;
    onClearCanvas: () => void;
    onScaleChange: (scale: number) => void;
}

const Canvas: React.FC<CanvasProps> = ({ notes, onAddNote, onUpdateNote, onDeleteNote, onDuplicateNote, onClearCanvas, onScaleChange }) => {
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, canvasX: number, canvasY: number } | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        const { clientX, clientY } = e;
        setContextMenu({
            x: clientX,
            y: clientY,
            canvasX: clientX - 100, // Approximate for now
            canvasY: clientY - 100
        });
    };

    const closeMenu = () => setContextMenu(null);

    return (
        <div
            ref={canvasRef}
            className="flex-1 h-full relative bg-background-500 overflow-hidden"
            onContextMenu={handleContextMenu}
            onClick={closeMenu}
        >
            {/* Background elements for consistency with Home */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />
            <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
            <TransformWrapper
                initialScale={1}
                minScale={0.1}
                maxScale={5}
                onTransformed={(ref) => onScaleChange(ref.state.scale)}
                limitToBounds={false}
                doubleClick={{ disabled: true }}
                panning={{ activationKeys: [] }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <TransformComponent
                            wrapperStyle={{ width: '100%', height: '100%' }}
                            contentStyle={{ width: '20000px', height: '20000px' }}
                        >
                            <div
                                className="w-full h-full relative cursor-crosshair"
                            >
                                {notes.map((note) => (
                                    <NoteCard
                                        key={note.id}
                                        note={note}
                                        onUpdate={(updates) => onUpdateNote(note.id, updates)}
                                        onDelete={() => onDeleteNote(note.id)}
                                        onDuplicate={() => onDuplicateNote(note.id)}
                                    />
                                ))}
                            </div>
                        </TransformComponent>

                        <div className="absolute left-6 bottom-6 z-50 flex flex-col gap-2 pointer-events-auto">
                            <button
                                onClick={() => zoomIn()}
                                className="w-10 h-10 rounded-xl bg-background-400 border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
                            >
                                <IconPlus size={20} />
                            </button>
                            <button
                                onClick={() => zoomOut()}
                                className="w-10 h-10 rounded-xl bg-background-400 border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
                            >
                                <div className="w-4 h-0.5 bg-white rounded-full" />
                            </button>
                            <button
                                onClick={() => resetTransform()}
                                className="px-3 h-10 rounded-xl bg-background-400 border border-white/10 flex items-center justify-center text-xs font-bold text-white hover:bg-white/5 transition-all"
                            >
                                RESET
                            </button>
                        </div>
                    </>
                )}
            </TransformWrapper>

            <AnimatePresence>
                {contextMenu && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed z-[1000] bg-[#0A0A0B]/90 border border-white/5 rounded-[24px] shadow-2xl w-64 backdrop-blur-xl overflow-hidden"
                        style={{ left: contextMenu.x, top: contextMenu.y }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col py-1">
                            <button
                                onClick={() => { onAddNote('text', contextMenu.canvasX, contextMenu.canvasY); closeMenu(); }}
                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 text-white transition-all text-base font-medium group"
                            >
                                <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                <span>Create note</span>
                            </button>
                            <div className="h-[1px] bg-white/5 mx-4" />
                            <button
                                onClick={() => { onAddNote('todo', contextMenu.canvasX, contextMenu.canvasY); closeMenu(); }}
                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 text-white transition-all text-base font-medium group"
                            >
                                <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                <span>Create a to do list</span>
                            </button>
                            <div className="h-[1px] bg-white/5 mx-4" />
                            <button
                                onClick={() => { toast.success('Image upload coming soon!'); closeMenu(); }}
                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-white/5 text-white transition-all text-base font-medium group"
                            >
                                <IconPlus size={20} className="text-white/60 group-hover:text-white" />
                                <span>Add Image</span>
                            </button>
                            <div className="h-[1px] bg-white/5 mx-4" />
                            <button
                                onClick={() => { onClearCanvas(); closeMenu(); }}
                                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-500/10 text-[#FF4B4B] transition-all text-base font-medium group"
                            >
                                <IconTrash size={20} className="text-[#FF4B4B]" />
                                <span>Clean canvas</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Canvas;
