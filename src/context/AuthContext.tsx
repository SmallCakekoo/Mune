import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Category, FavoriteSong } from '../types/user.types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock initial user
const mockUser: User = {
    id: 'user1',
    name: 'Snow Cat',
    username: 'snowcat777nyan',
    email: 'snow@mune.com',
    bio: "I'm a beatiful butterfly",
    avatar: '/src/assets/images/cats/Cat (9).png',
    favoriteSongs: [
        {
            title: 'mice on venus',
            artist: 'c418',
            albumCover: '/src/assets/images/album/mice on venus - c418.jpg.jpg'
        },
        {
            title: 'moog city',
            artist: 'c418',
            albumCover: '/src/assets/images/album/moog city - c418.jpg'
        }
    ],
    socialLinks: {
        discord: '@snowcat777nyan',
        github: '@snowcatreact',
        linkedin: '@iamsnowcatprofessional',
    },
    stats: {
        roomsCreated: 1902,
        minutesSpent: 11118,
    },
    categories: [
        { id: 'cat1', name: 'Work', roomIds: ['1', '2'] },
        { id: 'cat2', name: 'Chill', roomIds: ['3'] },
    ],
    createdAt: new Date('2023-01-01'),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUser(mockUser);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const updateUser = async (data: Partial<User>) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser((prev) => (prev ? { ...prev, ...data } : null));
                resolve();
            }, 500);
        });
    };

    const addCategory = async (name: string) => {
        const newCategory: Category = {
            id: `cat-${Date.now()}`,
            name,
            roomIds: [],
        };
        setUser((prev) => prev ? { ...prev, categories: [...(prev.categories || []), newCategory] } : null);
    };

    const removeCategory = async (id: string) => {
        setUser((prev) => prev ? { ...prev, categories: (prev.categories || []).filter(c => c.id !== id) } : null);
    };

    const updateCategory = async (id: string, name: string) => {
        setUser((prev) => prev ? {
            ...prev,
            categories: (prev.categories || []).map(c => c.id === id ? { ...c, name } : c)
        } : null);
    };

    const addRoomToCategory = async (categoryId: string, roomId: string) => {
        setUser((prev) => prev ? {
            ...prev,
            categories: (prev.categories || []).map(c =>
                c.id === categoryId && !c.roomIds.includes(roomId)
                    ? { ...c, roomIds: [...c.roomIds, roomId] }
                    : c
            )
        } : null);
    };

    const removeRoomFromCategory = async (categoryId: string, roomId: string) => {
        setUser((prev) => prev ? {
            ...prev,
            categories: (prev.categories || []).map(c =>
                c.id === categoryId
                    ? { ...c, roomIds: c.roomIds.filter(id => id !== roomId) }
                    : c
            )
        } : null);
    };

    const updateFavoriteSongs = async (songs: FavoriteSong[]) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser((prev) => (prev ? { ...prev, favoriteSongs: songs } : null));
                resolve();
            }, 500);
        });
    };

    const logout = async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser(null);
                resolve();
            }, 500);
        });
    };

    const deleteAccount = async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                setUser(null);
                resolve();
            }, 500);
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                updateUser,
                addCategory,
                removeCategory,
                updateCategory,
                addRoomToCategory,
                removeRoomFromCategory,
                updateFavoriteSongs,
                logout,
                deleteAccount,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
