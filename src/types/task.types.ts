import { Timestamp } from 'firebase/firestore';

export interface Task {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
}

export type CreateTaskData = Pick<Task, 'text' | 'completed'>;
