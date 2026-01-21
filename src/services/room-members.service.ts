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
  increment,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Member role type
 */
export type MemberRole = 'owner' | 'admin' | 'member';

/**
 * Room member interface
 */
export interface RoomMember {
  userId: string;
  role: MemberRole;
  joinedAt: Date | string;
  lastActive: Date | string;
  isWriting: boolean;
}

/**
 * Add member to room
 */
export const addMemberToRoom = async (
  roomId: string,
  userId: string,
  role: MemberRole = 'member'
): Promise<void> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  
  const memberData = {
    userId,
    role,
    joinedAt: serverTimestamp(),
    lastActive: serverTimestamp(),
    isWriting: false,
  };
  
  await setDoc(memberRef, memberData);
  
  // Increment member count in room document
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    memberCount: increment(1),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Remove member from room
 */
export const removeMemberFromRoom = async (
  roomId: string,
  userId: string
): Promise<void> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  await deleteDoc(memberRef);
  
  // Decrement member count in room document
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    memberCount: increment(-1),
    updatedAt: serverTimestamp(),
  });
};

/**
 * Get member role
 */
export const getMemberRole = async (
  roomId: string,
  userId: string
): Promise<MemberRole | null> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  const memberSnap = await getDoc(memberRef);
  
  if (!memberSnap.exists()) {
    return null;
  }
  
  return memberSnap.data().role;
};

/**
 * Update member role
 */
export const updateMemberRole = async (
  roomId: string,
  userId: string,
  role: MemberRole
): Promise<void> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  await updateDoc(memberRef, {
    role,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Get all room members
 */
export const getRoomMembers = async (roomId: string): Promise<RoomMember[]> => {
  const membersRef = collection(db, 'rooms', roomId, 'members');
  const snapshot = await getDocs(membersRef);
  
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
  } as RoomMember));
};

/**
 * Update member presence (active/writing status)
 */
export const updateMemberPresence = async (
  roomId: string,
  userId: string,
  isWriting: boolean = false
): Promise<void> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  await updateDoc(memberRef, {
    lastActive: serverTimestamp(),
    isWriting,
  });
};

/**
 * Check if user is member of room
 */
export const isMemberOfRoom = async (
  roomId: string,
  userId: string
): Promise<boolean> => {
  const memberRef = doc(db, 'rooms', roomId, 'members', userId);
  const memberSnap = await getDoc(memberRef);
  return memberSnap.exists();
};

/**
 * Subscribe to room members (real-time)
 */
export const subscribeToRoomMembers = (
  roomId: string,
  callback: (members: RoomMember[]) => void
): Unsubscribe => {
  const membersRef = collection(db, 'rooms', roomId, 'members');
  
  return onSnapshot(
    membersRef,
    (snapshot) => {
      const members = snapshot.docs.map((doc) => ({
        ...doc.data(),
      } as RoomMember));
      
      callback(members);
    },
    (error) => {
      console.error('Error subscribing to room members:', error);
      callback([]);
    }
  );
};

/**
 * Room members service errors
 */
export class RoomMembersServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomMembersServiceError';
  }
}
