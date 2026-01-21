import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Room, RoomPrivacy } from '../types/room.types';
import { timestampToDate } from '../types/firestore.types';
import { hashPassword } from '../utils/encryption';

/**
 * Room creation data
 */
export interface CreateRoomData {
  name: string;
  description?: string;
  privacy: RoomPrivacy;
  password?: string;
}

/**
 * Create a new room
 */
export const createRoom = async (
  ownerId: string,
  roomData: CreateRoomData
): Promise<string> => {
  console.log('room.service: createRoom called', { ownerId, roomData });
  const batch = writeBatch(db);
  
  // Create room document
  const roomsRef = collection(db, 'rooms');
  const newRoomRef = doc(roomsRef);
  
  const room = {
    name: roomData.name,
    description: roomData.description || '',
    privacy: roomData.privacy,
    password: roomData.password ? await hashPassword(roomData.password) : null,
    ownerId,
    songCount: 0,
    memberCount: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastActivity: serverTimestamp(),
  };
  
  batch.set(newRoomRef, room);
  
  // Auto-add owner to members subcollection
  const memberRef = doc(db, 'rooms', newRoomRef.id, 'members', ownerId);
  const memberData = {
    userId: ownerId,
    role: 'owner' as const,
    joinedAt: serverTimestamp(),
    lastActive: serverTimestamp(),
    isWriting: false,
  };
  
  batch.set(memberRef, memberData);
  
  // Commit batch
  await batch.commit();
  
  return newRoomRef.id;
};

/**
 * Get room by ID
 */
export const getRoomById = async (roomId: string): Promise<Room | null> => {
  const roomRef = doc(db, 'rooms', roomId);
  const roomSnap = await getDoc(roomRef);
  
  if (!roomSnap.exists()) {
    return null;
  }
  
  const data = roomSnap.data();
  
  // Fetch owner info
  const ownerRef = doc(db, 'users', data.ownerId);
  const ownerSnap = await getDoc(ownerRef);
  const ownerData = ownerSnap.exists() ? ownerSnap.data() : null;
  
  // Fetch members
  const membersRef = collection(db, 'rooms', roomId, 'members');
  const membersSnap = await getDocs(membersRef);
  
  const memberIds = membersSnap.docs.map((doc) => doc.data().userId);
  const memberPromises = memberIds.map(async (userId) => {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
    return {
      id: userId,
      name: userData?.name || 'Unknown',
      email: userData?.email,
      avatar: userData?.avatar,
    };
  });
  
  const members = await Promise.all(memberPromises);
  
  return {
    id: roomSnap.id,
    name: data.name,
    description: data.description,
    privacy: data.privacy,
    password: data.password,
    owner: {
      id: data.ownerId,
      name: ownerData?.name || 'Unknown',
      email: ownerData?.email,
      avatar: ownerData?.avatar,
    },
    members,
    songCount: data.songCount,
    memberCount: data.memberCount,
    lastActivity: timestampToDate(data.lastActivity),
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
  } as Room;
};

/**
 * Update room
 */
export const updateRoom = async (
  roomId: string,
  data: Partial<Omit<Room, 'id' | 'owner' | 'members' | 'createdAt'>>
): Promise<void> => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Delete room and all subcollections
 */
export const deleteRoom = async (roomId: string): Promise<void> => {
  const batch = writeBatch(db);
  
  // Delete members subcollection
  const membersRef = collection(db, 'rooms', roomId, 'members');
  const membersSnap = await getDocs(membersRef);
  membersSnap.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  // Delete notes subcollection
  const notesRef = collection(db, 'rooms', roomId, 'notes');
  const notesSnap = await getDocs(notesRef);
  notesSnap.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  // Delete playlist subcollection
  const playlistRef = collection(db, 'rooms', roomId, 'playlist');
  const playlistSnap = await getDocs(playlistRef);
  playlistSnap.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  // Delete room document
  const roomRef = doc(db, 'rooms', roomId);
  batch.delete(roomRef);
  
  await batch.commit();
};

/**
 * Get rooms where user is a member
 */
export const getRoomsForUser = async (userId: string): Promise<Room[]> => {
  // Query all rooms
  const roomsRef = collection(db, 'rooms');
  const roomsSnap = await getDocs(roomsRef);
  
  // Filter rooms where user is a member by checking members subcollection
  const roomPromises = roomsSnap.docs.map(async (roomDoc) => {
    const memberRef = doc(db, 'rooms', roomDoc.id, 'members', userId);
    const memberSnap = await getDoc(memberRef);
    
    if (memberSnap.exists()) {
      return getRoomById(roomDoc.id);
    }
    return null;
  });
  
  const rooms = await Promise.all(roomPromises);
  return rooms.filter((room): room is Room => room !== null);
};

/**
 * Get user's public rooms
 */
export const getUserPublicRooms = async (userId: string): Promise<Room[]> => {
  const roomsRef = collection(db, 'rooms');
  const q = query(
    roomsRef,
    where('ownerId', '==', userId),
    where('privacy', '==', 'public'),
    orderBy('updatedAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  const roomPromises = snapshot.docs.map((doc) => getRoomById(doc.id));
  const rooms = await Promise.all(roomPromises);
  
  return rooms.filter((room): room is Room => room !== null);
};

/**
 * Get ALL public rooms (for Search page)
 */
/**
 * Get ALL rooms (public and private) for Search page
 */
export const getAllRooms = async (): Promise<Room[]> => {
  const roomsRef = collection(db, 'rooms');
  const q = query(
    roomsRef
    // No filters - fetch all rooms
  );
  
  const snapshot = await getDocs(q);
  const roomPromises = snapshot.docs.map((doc) => getRoomById(doc.id));
  const roomsResult = await Promise.all(roomPromises);
  const validRooms = roomsResult.filter((room): room is Room => room !== null);
  
  // Client-side sort by createdAt desc
  return validRooms.sort((a, b) => {
    const timeA = a.createdAt instanceof Date ? a.createdAt.getTime() : 0;
    const timeB = b.createdAt instanceof Date ? b.createdAt.getTime() : 0;
    return timeB - timeA;
  });
};

/**
 * Update room privacy
 */
export const updateRoomPrivacy = async (
  roomId: string,
  privacy: RoomPrivacy,
  password?: string
): Promise<void> => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    privacy,
    password: (privacy === 'private' && password) ? await hashPassword(password) : null,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Subscribe to room changes (real-time)
 */
export const subscribeToRoom = (
  roomId: string,
  callback: (room: Room | null) => void
): Unsubscribe => {
  const roomRef = doc(db, 'rooms', roomId);
  
  return onSnapshot(
    roomRef,
    async (snapshot) => {
      if (!snapshot.exists()) {
        callback(null);
        return;
      }
      
      const room = await getRoomById(roomId);
      callback(room);
    },
    (error) => {
      console.error('Error subscribing to room:', error);
      callback(null);
    }
  );
};

/**
 * Subscribe to user's rooms (real-time)
 */
export const subscribeToUserRooms = (
  userId: string,
  callback: (rooms: Room[]) => void
): Unsubscribe => {
  // This is a simplified version - in production you'd want to optimize this
  const roomsRef = collection(db, 'rooms');
  
  return onSnapshot(
    roomsRef,
    async () => {
      const rooms = await getRoomsForUser(userId);
      callback(rooms);
    },
    (error) => {
      console.error('Error subscribing to user rooms:', error);
      callback([]);
    }
  );
};

/**
 * Update room's last activity
 */
export const updateRoomActivity = async (roomId: string): Promise<void> => {
  const roomRef = doc(db, 'rooms', roomId);
  await updateDoc(roomRef, {
    lastActivity: serverTimestamp(),
  });
};

/**
 * Room service errors
 */
export class RoomServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RoomServiceError';
  }
}
