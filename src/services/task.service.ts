import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Task, CreateTaskData } from '../types/task.types';

const TASKS_COLLECTION = 'tasks';

/**
 * Create a new task
 */
export const createTask = async (userId: string, taskData: CreateTaskData): Promise<string> => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  
  const newTask = {
    userId,
    text: taskData.text,
    completed: taskData.completed,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(tasksRef, newTask);
  return docRef.id;
};

/**
 * Update a task
 */
export const updateTask = async (taskId: string, data: Partial<Pick<Task, 'text' | 'completed'>>): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await updateDoc(taskRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete a task
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);
  await deleteDoc(taskRef);
};

/**
 * Subscribe to user's tasks
 */
export const subscribeToUserTasks = (
  userId: string,
  callback: (tasks: Task[]) => void
): Unsubscribe => {
  const tasksRef = collection(db, TASKS_COLLECTION);
  const q = query(
    tasksRef,
    where('userId', '==', userId),
    where('userId', '==', userId)
    // orderBy removed to avoid index requirement for now. Client-side sort used instead.
  );

  console.log('task.service: subscribing to tasks for user:', userId);
  return onSnapshot(
    q,
    (snapshot) => {
      console.log('task.service: snapshot received, docs count:', snapshot.docs.length);
      const tasks = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          text: data.text,
          completed: data.completed,
          createdAt: data.createdAt?.toDate?.() || new Date(),
          updatedAt: data.updatedAt?.toDate?.() || new Date(),
        } as Task;
      });
      callback(tasks);
    },
    (error) => {
      console.error('task.service: Error subscribing to tasks:', error);
      // Check for index error specifically
      if (error.code === 'failed-precondition' && error.message.includes('index')) {
        console.error('task.service: MISSING INDEX. Please create it using the link in the error above.');
      }
      callback([]);
    }
  );
};
