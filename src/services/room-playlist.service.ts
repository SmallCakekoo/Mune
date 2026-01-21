import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  increment,
  query,
  orderBy,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { timestampToDate } from '../types/firestore.types';

/**
 * Playlist song interface
 */
export interface PlaylistSong {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  duration: number;
  addedBy: string;
  addedAt: Date | string;
  isPlaying: boolean;
  progress: number;
}

/**
 * Add song data (without id and timestamps)
 */
export interface AddSongData {
  title: string;
  artist: string;
  albumCover: string;
  duration: number;
  addedBy: string;
}

/**
 * Add song to playlist
 */
export const addSongToPlaylist = async (
  roomId: string,
  songData: AddSongData
): Promise<string> => {
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const newSongRef = doc(playlistRef);
  
  const song = {
    ...songData,
    isPlaying: false,
    progress: 0,
    addedAt: serverTimestamp(),
  };
  
  await setDoc(newSongRef, song);
  
  // Increment song count in room document
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    songCount: increment(1),
    updatedAt: serverTimestamp(),
  });
  
  return newSongRef.id;
};

/**
 * Remove song from playlist
 */
export const removeSongFromPlaylist = async (
  roomId: string,
  songId: string
): Promise<void> => {
  const songRef = doc(db, 'rooms', roomId, 'playlist', songId);
  await deleteDoc(songRef);
  
  // Decrement song count in room document
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    songCount: increment(-1),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update currently playing song
 */
export const updateCurrentSong = async (
  roomId: string,
  songId: string | null,
  progress: number = 0
): Promise<void> => {
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const snapshot = await getDocs(playlistRef);
  
  // Set all songs to not playing
  const updatePromises = snapshot.docs.map(async (docSnap) => {
    if (docSnap.id === songId) {
      // This is the song to play
      return updateDoc(docSnap.ref, {
        isPlaying: true,
        progress,
      });
    } else {
      // Stop other songs
      return updateDoc(docSnap.ref, {
        isPlaying: false,
      });
    }
  });
  
  await Promise.all(updatePromises);
  
  // Update room's current music metadata if needed
  if (songId) {
    const currentSongSnap = await getDocs(
      query(collection(db, 'rooms', roomId, 'playlist'))
    );
    const currentSong = currentSongSnap.docs.find((d) => d.id === songId)?.data();
    
    if (currentSong) {
      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        currentMusic: {
          title: currentSong.title,
          artist: currentSong.artist,
          albumCover: currentSong.albumCover,
          isPlaying: true,
          progress,
          duration: currentSong.duration,
        },
        lastActivity: serverTimestamp(),
      });
    }
  }
};

/**
 * Update song progress
 */
export const updateSongProgress = async (
  roomId: string,
  songId: string,
  progress: number
): Promise<void> => {
  const songRef = doc(db, 'rooms', roomId, 'playlist', songId);
  await updateDoc(songRef, {
    progress,
  });
  
  // Update room's current music progress
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    'currentMusic.progress': progress,
  });
};

/**
 * Pause/resume song
 */
export const togglePlayPause = async (
  roomId: string,
  songId: string,
  isPlaying: boolean
): Promise<void> => {
  const songRef = doc(db, 'rooms', roomId, 'playlist', songId);
  await updateDoc(songRef, {
    isPlaying,
  });
  
  // Update room's current music playing status
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    'currentMusic.isPlaying': isPlaying,
  });
};

/**
 * Get playlist for a room
 */
export const getPlaylist = async (roomId: string): Promise<PlaylistSong[]> => {
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const q = query(playlistRef, orderBy('addedAt', 'asc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      addedAt: timestampToDate(data.addedAt),
    } as PlaylistSong;
  });
};

/**
 * Subscribe to playlist (real-time)
 */
export const subscribeToPlaylist = (
  roomId: string,
  callback: (playlist: PlaylistSong[]) => void
): Unsubscribe => {
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const q = query(playlistRef, orderBy('addedAt', 'asc'));
  
  return onSnapshot(
    q,
    (snapshot) => {
      const playlist = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          addedAt: timestampToDate(data.addedAt),
        } as PlaylistSong;
      });
      
      callback(playlist);
    },
    (error) => {
      console.error('Error subscribing to playlist:', error);
      callback([]);
    }
  );
};

/**
 * Clear entire playlist
 */
export const clearPlaylist = async (roomId: string): Promise<void> => {
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const snapshot = await getDocs(playlistRef);
  
  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
  await Promise.all(deletePromises);
  
  // Reset song count in room
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    songCount: 0,
    currentMusic: null,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Playlist service errors
 */
export class PlaylistServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PlaylistServiceError';
  }
}
