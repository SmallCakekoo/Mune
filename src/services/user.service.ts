import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User, FavoriteSong } from '../types/user.types';
import { timestampToDate } from '../types/firestore.types';

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return null;
  }
  
  const data = userSnap.data();
  return {
    id: userSnap.id,
    ...data,
    createdAt: timestampToDate(data.createdAt),
  } as User;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
  userId: string,
  data: Partial<Omit<User, 'id' | 'email' | 'createdAt'>>
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Add favorite song
 */
export const addFavoriteSong = async (
  userId: string,
  song: FavoriteSong
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favoriteSongs: arrayUnion(song),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Remove favorite song
 */
export const removeFavoriteSong = async (
  userId: string,
  song: FavoriteSong
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favoriteSongs: arrayRemove(song),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update favorite songs array
 */
export const updateFavoriteSongs = async (
  userId: string,
  songs: FavoriteSong[]
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favoriteSongs: songs,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Update social links
 */
export const updateSocialLinks = async (
  userId: string,
  links: User['socialLinks']
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    socialLinks: links,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Get user statistics
 */
export const getUserStats = async (
  userId: string
): Promise<User['stats'] | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    return null;
  }
  
  return userSnap.data().stats || { roomsCreated: 0, minutesSpent: 0 };
};

/**
 * Increment rooms created count
 */
export const incrementRoomsCreated = async (userId: string): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'stats.roomsCreated': increment(1),
  });
};

/**
 * Increment minutes spent
 */
export const incrementMinutesSpent = async (
  userId: string,
  minutes: number
): Promise<void> => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    'stats.minutesSpent': increment(minutes),
  });
};

/**
 * Subscribe to user changes (real-time)
 */
export const subscribeToUser = (
  userId: string,
  callback: (user: User | null) => void
): Unsubscribe => {
  const userRef = doc(db, 'users', userId);
  
  return onSnapshot(
    userRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      
      const data = snapshot.data();
      const user: User = {
        id: snapshot.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
      } as User;
      
      callback(user);
    },
    (error) => {
      console.error('Error subscribing to user:', error);
      callback(null);
    }
  );
}

/**
 * Delete user and all their data
 */
export const deleteUserFullData = async (userId: string): Promise<void> => {
  const batch = writeBatch(db);

  // 1. Delete user document
  const userRef = doc(db, 'users', userId);
  batch.delete(userRef);

  // 2. Find and delete all rooms owned by user
  const roomsRef = collection(db, 'rooms');
  const q = query(roomsRef, where('ownerId', '==', userId));
  const roomsSnapshot = await getDocs(q);

  roomsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Commit the batch
  await batch.commit();
};

/**
 * User service errors
 */
export class UserServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserServiceError';
  }
}
