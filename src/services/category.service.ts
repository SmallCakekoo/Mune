import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Category } from '../types/user.types';

/**
 * Create a new category for a user
 */
export const createCategory = async (
  userId: string,
  name: string
): Promise<string> => {
  const categoriesRef = collection(db, 'users', userId, 'categories');
  const newCategoryRef = doc(categoriesRef);
  
  const categoryData = {
    name,
    roomIds: [],
    createdAt: serverTimestamp(),
  };
  
  await setDoc(newCategoryRef, categoryData);
  
  return newCategoryRef.id;
};

/**
 * Update category name
 */
export const updateCategory = async (
  userId: string,
  categoryId: string,
  name: string
): Promise<void> => {
  const categoryRef = doc(db, 'users', userId, 'categories', categoryId);
  await updateDoc(categoryRef, {
    name,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete category
 */
export const deleteCategory = async (
  userId: string,
  categoryId: string
): Promise<void> => {
  const categoryRef = doc(db, 'users', userId, 'categories', categoryId);
  await deleteDoc(categoryRef);
};

/**
 * Add room to category
 */
export const addRoomToCategory = async (
  userId: string,
  categoryId: string,
  roomId: string
): Promise<void> => {
  const categoryRef = doc(db, 'users', userId, 'categories', categoryId);
  await updateDoc(categoryRef, {
    roomIds: arrayUnion(roomId),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Remove room from category
 */
export const removeRoomFromCategory = async (
  userId: string,
  categoryId: string,
  roomId: string
): Promise<void> => {
  const categoryRef = doc(db, 'users', userId, 'categories', categoryId);
  await updateDoc(categoryRef, {
    roomIds: arrayRemove(roomId),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Get all categories for a user
 */
export const getUserCategories = async (
  userId: string
): Promise<Category[]> => {
  const categoriesRef = collection(db, 'users', userId, 'categories');
  const snapshot = await getDocs(categoriesRef);
  
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  } as Category));
};

/**
 * Subscribe to user categories (real-time)
 */
export const subscribeToCategories = (
  userId: string,
  callback: (categories: Category[]) => void
): Unsubscribe => {
  const categoriesRef = collection(db, 'users', userId, 'categories');
  
  return onSnapshot(
    categoriesRef,
    (snapshot) => {
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Category));
      
      callback(categories);
    },
    (error) => {
      console.error('Error subscribing to categories:', error);
      callback([]);
    }
  );
};

/**
 * Category service errors
 */
export class CategoryServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CategoryServiceError';
  }
}
