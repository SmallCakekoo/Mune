import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Note, NoteType, TodoItem } from '../types/room.types';
import { uploadRoomImage, type UploadProgressCallback } from './storage/storageService';
import { timestampToDate } from '../types/firestore.types';

/**
 * Note creation data
 */
export interface CreateNoteData {
  type: NoteType;
  title: string;
  content: string | TodoItem[];
  x: number;
  y: number;
  color: string;
  width?: number;
  height?: number;
  authorId: string;
}

/**
 * Create a new note in a room
 */
export const createNote = async (
  roomId: string,
  noteData: CreateNoteData
): Promise<string> => {
  const notesRef = collection(db, 'rooms', roomId, 'notes');
  const newNoteRef = doc(notesRef);
  
  const note = {
    ...noteData,
    createdAt: serverTimestamp(),
    lastModified: serverTimestamp(),
  };
  
  await setDoc(newNoteRef, note);
  
  return newNoteRef.id;
};

/**
 * Update a note
 */
export const updateNote = async (
  roomId: string,
  noteId: string,
  data: Partial<Omit<Note, 'id' | 'createdAt' | 'authorId'>>
): Promise<void> => {
  const noteRef = doc(db, 'rooms', roomId, 'notes', noteId);
  await updateDoc(noteRef, {
    ...data,
    lastModified: serverTimestamp(),
  });
};

/**
 * Delete a note
 */
export const deleteNote = async (
  roomId: string,
  noteId: string
): Promise<void> => {
  const noteRef = doc(db, 'rooms', roomId, 'notes', noteId);
  await deleteDoc(noteRef);
};

/**
 * Upload image for a note
 */
export const uploadNoteImage = async (
  roomId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> => {
  const imageUrl = await uploadRoomImage(roomId, file, onProgress);
  return imageUrl;
};

/**
 * Create image note
 */
export const createImageNote = async (
  roomId: string,
  file: File,
  noteData: Omit<CreateNoteData, 'type' | 'content'>,
  onProgress?: UploadProgressCallback
): Promise<string> => {
  // Upload image first
  const imageUrl = await uploadNoteImage(roomId, file, onProgress);
  
  // Create note with image URL
  return createNote(roomId, {
    ...noteData,
    type: 'image',
    content: imageUrl,
  });
};

/**
 * Get all notes for a room
 */
export const getRoomNotes = async (roomId: string): Promise<Note[]> => {
  const notesRef = collection(db, 'rooms', roomId, 'notes');
  const snapshot = await getDocs(notesRef);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: timestampToDate(data.createdAt),
      lastModified: timestampToDate(data.lastModified),
    } as Note;
  });
};

/**
 * Get single note
 */
export const getNoteById = async (
  roomId: string,
  noteId: string
): Promise<Note | null> => {
  const noteRef = doc(db, 'rooms', roomId, 'notes', noteId);
  const snapshot = await getDoc(noteRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  const data = snapshot.data();
  return {
    id: snapshot.id,
    ...data,
    createdAt: timestampToDate(data.createdAt),
    lastModified: timestampToDate(data.lastModified),
  } as Note;
};

/**
 * Update note position on canvas
 */
export const updateNotePosition = async (
  roomId: string,
  noteId: string,
  x: number,
  y: number
): Promise<void> => {
  const noteRef = doc(db, 'rooms', roomId, 'notes', noteId);
  await updateDoc(noteRef, {
    x,
    y,
    lastModified: serverTimestamp(),
  });
};

/**
 * Update note size
 */
export const updateNoteSize = async (
  roomId: string,
  noteId: string,
  width: number,
  height: number
): Promise<void> => {
  const noteRef = doc(db, 'rooms', roomId, 'notes', noteId);
  await updateDoc(noteRef, {
    width,
    height,
    lastModified: serverTimestamp(),
  });
};

/**
 * Toggle todo item completion
 */
export const toggleTodoItem = async (
  roomId: string,
  noteId: string,
  todoId: string
): Promise<void> => {
  const note = await getNoteById(roomId, noteId);
  
  if (!note || note.type !== 'todo' || !Array.isArray(note.content)) {
    throw new Error('Invalid note or note type');
  }
  
  const updatedContent = (note.content as TodoItem[]).map((item) =>
    item.id === todoId ? { ...item, completed: !item.completed } : item
  );
  
  await updateNote(roomId, noteId, { content: updatedContent });
};

/**
 * Subscribe to room notes (real-time)
 */
export const subscribeToRoomNotes = (
  roomId: string,
  callback: (notes: Note[]) => void
): Unsubscribe => {
  const notesRef = collection(db, 'rooms', roomId, 'notes');
  
  return onSnapshot(
    notesRef,
    (snapshot) => {
      const notes = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: timestampToDate(data.createdAt),
          lastModified: timestampToDate(data.lastModified),
        } as Note;
      });
      
      callback(notes);
    },
    (error) => {
      console.error('Error subscribing to room notes:', error);
      callback([]);
    }
  );
};

/**
 * Room notes service errors
 */
export class RoomNotesServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomNotesServiceError';
  }
}
