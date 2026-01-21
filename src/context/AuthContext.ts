import { createContext } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import type { User, FavoriteSong } from '../types/user.types';

export interface AuthContextType {
    user: User | null;
    firebaseUser: FirebaseUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    addCategory: (name: string) => Promise<void>;
    removeCategory: (id: string) => Promise<void>;
    updateCategory: (id: string, name: string) => Promise<void>;
    addRoomToCategory: (categoryId: string, roomId: string) => Promise<void>;
    removeRoomFromCategory: (categoryId: string, roomId: string) => Promise<void>;
    updateFavoriteSongs: (songs: FavoriteSong[]) => Promise<void>;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
