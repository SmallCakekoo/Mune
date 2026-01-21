import { Timestamp } from 'firebase/firestore';

/**
 * Firestore Timestamp type alias
 */
export type FirestoreTimestamp = Timestamp;

/**
 * Utility type to add an ID field to a document
 */
export type WithId<T> = T & { id: string };

/**
 * Paginated response type for list queries
 */
export interface Paginated<T> {
  data: T[];
  hasMore: boolean;
  lastDoc?: unknown; // DocumentSnapshot for pagination
  total?: number;
}

/**
 * Common query options
 */
export interface QueryOptions {
  limit?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  startAfter?: unknown; // DocumentSnapshot
}

/**
 * Base document interface with common fields
 */
export interface BaseDocument {
  id: string;
  createdAt: FirestoreTimestamp;
  updatedAt?: FirestoreTimestamp;
}

/**
 * Convert Firebase Timestamp to Date for UI consumption
 */
export const timestampToDate = (timestamp: FirestoreTimestamp | undefined): Date | undefined => {
  return timestamp?.toDate();
};

/**
 * Convert Date to Firebase Timestamp for storage
 */
export const dateToTimestamp = (date: Date): FirestoreTimestamp => {
  return Timestamp.fromDate(date);
};
