import type { User } from './user.types';

export type NoteType = 'text' | 'todo' | 'image';
export type RoomPrivacy = 'public' | 'private';

export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface Note {
    id: string;
    type: NoteType;
    title: string;
    content: string | TodoItem[] | string; // text, todos array, or image URL
    x: number;
    y: number;
    color: string;
    width?: number;
    height?: number;
    authorId: string;
    createdAt: Date | string;
    lastModified?: Date | string;
}

export interface RoomPresence {
    userId: string;
    user: User;
    isWriting?: boolean;
    lastActive: Date | string;
}

export interface Room {
    id: string;
    name: string;
    description?: string;
    privacy: RoomPrivacy;
    password?: string;
    owner: {
        id: string;
        name: string;
        email?: string;
        avatar?: string;
    };
    members: {
        id: string;
        name: string;
        email?: string;
        avatar?: string;
    }[];
    notes?: Note[];
    activeMembers?: RoomPresence[];
    songCount?: number;
    memberCount?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    currentMusic?: {
        title: string;
        artist: string;
        albumCover: string;
        isPlaying: boolean;
        progress: number;
        duration: number;
    };
}
