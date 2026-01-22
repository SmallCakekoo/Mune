import { db } from '../lib/firebase';
import { 
    collection, 
    doc, 
    setDoc, 
    deleteDoc, 
    onSnapshot, 
    query, 
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import type { RoomPresence } from '../types/room.types';
import type { User } from '../types/user.types';

const PRESENCE_COLLECTION = 'rooms';
const PRESENCE_SUBCOLLECTION = 'presence';

export const joinRoom = async (roomId: string, user: User) => {
    const presenceRef = doc(db, PRESENCE_COLLECTION, roomId, PRESENCE_SUBCOLLECTION, user.id);
    const presenceData: Partial<RoomPresence> = {
        userId: user.id,
        // We no longer store the full user object here to avoid data duplication and stale names.
        // Names should be resolved reactively from the 'users' collection.
        lastActive: new Date().toISOString(),
        isWriting: false
    };

    await setDoc(presenceRef, {
        ...presenceData,
        lastActive: serverTimestamp()
    });
};

export const leaveRoom = async (roomId: string, userId: string) => {
    const presenceRef = doc(db, PRESENCE_COLLECTION, roomId, PRESENCE_SUBCOLLECTION, userId);
    try {
        await deleteDoc(presenceRef);
    } catch (error) {
        console.error('Error leaving room:', error);
    }
};

export const updateTypingStatus = async (roomId: string, userId: string, isWriting: boolean) => {
    const presenceRef = doc(db, PRESENCE_COLLECTION, roomId, PRESENCE_SUBCOLLECTION, userId);
    try {
        await updateDoc(presenceRef, {
            isWriting,
            lastActive: serverTimestamp()
        });
    } catch (error) {
        // User might have already left, ignore or handle
        console.warn('Could not update typing status, user might be offline:', error);
    }
};

export const subscribeToPresence = (roomId: string, callback: (members: RoomPresence[]) => void) => {
    const presenceCollectionRef = collection(db, PRESENCE_COLLECTION, roomId, PRESENCE_SUBCOLLECTION);
    const q = query(presenceCollectionRef);

    return onSnapshot(q, (snapshot) => {
        const members: RoomPresence[] = [];
        snapshot.forEach((doc) => {
            const data = doc.data();
            members.push({
                ...data,
                userId: doc.id,
                lastActive: data.lastActive?.toDate?.() || data.lastActive // Convert Firestore timestamp
            } as RoomPresence);
        });
        callback(members);
    });
};
