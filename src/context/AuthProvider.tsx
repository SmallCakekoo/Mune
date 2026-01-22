import React, { useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import {
    doc,
    onSnapshot,
} from 'firebase/firestore';
import type { User, Category, FavoriteSong } from '../types/user.types';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import * as categoryService from '../services/category.service';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';
import { db } from '../lib/firebase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Listen to auth state changes
    useEffect(() => {
        let unsubscribeUserDoc: () => void;

        const unsubscribeAuth = authService.onAuthStateChange(async (fbUser: FirebaseUser | null) => {
            setFirebaseUser(fbUser);

            // Clean up previous listener if exists
            if (unsubscribeUserDoc) {
                unsubscribeUserDoc();
            }

            if (fbUser) {
                try {
                    // Subscribe to user document for real-time updates
                    const userRef = doc(db, 'users', fbUser.uid);
                    unsubscribeUserDoc = onSnapshot(userRef, (docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data() as User;
                            // Add ID to user data since it's not in the document body typically
                            setUser({ ...userData, id: fbUser.uid });
                            setIsLoading(false);
                        } else {
                            // User document not found yet (common in first login/signup)
                            // We don't set isLoading(false) or setUser(null) yet to avoid flickering correctly
                            console.log('Waiting for user document to be created...');

                            // Safety timeout: if after 10 seconds document still doesn't exist, stop loading
                            setTimeout(() => {
                                setIsLoading((loading) => {
                                    if (loading) {
                                        console.error('User document not found after 10 seconds');
                                        return false;
                                    }
                                    return loading;
                                });
                            }, 10000);
                        }
                    }, (error) => {
                        console.error('Error listening to user data:', error);
                        setIsLoading(false);
                    });
                } catch (error) {
                    console.error('Error setting up user listener:', error);
                    setUser(null);
                    setIsLoading(false);
                }
            } else {
                setUser(null);
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUserDoc) {
                unsubscribeUserDoc();
            }
        };
    }, []);

    // Subscribe to user categories
    useEffect(() => {
        if (!firebaseUser) return;

        const unsubscribe = categoryService.subscribeToCategories(
            firebaseUser.uid,
            (cats: Category[]) => {
                // Update user with categories using functional update to avoid dependency on user
                setUser((prev) => (prev ? { ...prev, categories: cats } : null));
            }
        );

        return () => unsubscribe();
    }, [firebaseUser]);

    // Track minutes spent
    useEffect(() => {
        if (!firebaseUser) return;

        const intervalId = setInterval(async () => {
            try {
                await userService.incrementMinutesSpent(firebaseUser.uid, 1);
            } catch (error) {
                console.error('Error tracking time:', error);
            }
        }, 60000); // Update every minute

        return () => clearInterval(intervalId);
    }, [firebaseUser]);

    const signInWithEmail = async (email: string, password: string): Promise<void> => {
        try {
            setIsLoading(true);
            await authService.signInWithEmail(email, password);
            toast.success('Welcome back!');
        } catch (error) {
            const message = authService.getAuthErrorMessage(error);
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUpWithEmail = async (
        email: string,
        password: string,
        displayName: string
    ): Promise<void> => {
        try {
            setIsLoading(true);
            await authService.signUpWithEmail(email, password, displayName);
            toast.success('Account created successfully!');
        } catch (error) {
            const message = authService.getAuthErrorMessage(error);
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await authService.signInWithGoogle();
            toast.success('Signed in with Google!');
        } catch (error) {
            const message = authService.getAuthErrorMessage(error);
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGithub = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await authService.signInWithGithub();
            toast.success('Signed in with GitHub!');
        } catch (error) {
            const message = authService.getAuthErrorMessage(error);
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (data: Partial<User>): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await userService.updateUserProfile(firebaseUser.uid, data);
            toast.success('Profile updated!');
        } catch {
            toast.error('Failed to update profile');
            throw new Error('Failed to update profile');
        }
    };

    const addCategory = async (name: string): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await categoryService.createCategory(firebaseUser.uid, name);
            toast.success('Category created!');
        } catch {
            toast.error('Failed to create category');
            throw new Error('Failed to create category');
        }
    };

    const removeCategory = async (id: string): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await categoryService.deleteCategory(firebaseUser.uid, id);
            toast.success('Category deleted!');
        } catch {
            toast.error('Failed to delete category');
            throw new Error('Failed to delete category');
        }
    };

    const updateCategory = async (id: string, name: string): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await categoryService.updateCategory(firebaseUser.uid, id, name);
            toast.success('Category updated!');
        } catch {
            toast.error('Failed to update category');
            throw new Error('Failed to update category');
        }
    };

    const addRoomToCategory = async (categoryId: string, roomId: string): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await categoryService.addRoomToCategory(firebaseUser.uid, categoryId, roomId);
        } catch {
            toast.error('Failed to add room to category');
            throw new Error('Failed to add room to category');
        }
    };

    const removeRoomFromCategory = async (categoryId: string, roomId: string): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await categoryService.removeRoomFromCategory(firebaseUser.uid, categoryId, roomId);
        } catch {
            toast.error('Failed to remove room from category');
            throw new Error('Failed to remove room from category');
        }
    };

    const updateFavoriteSongs = async (songs: FavoriteSong[]): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');

        try {
            await userService.updateFavoriteSongs(firebaseUser.uid, songs);
            toast.success('Favorite songs updated!');
        } catch {
            toast.error('Failed to update favorite songs');
            throw new Error('Failed to update favorite songs');
        }
    };

    const logout = async (): Promise<void> => {
        try {
            await authService.signOut();
            toast.success('Signed out successfully');
        } catch {
            toast.error('Failed to sign out');
            throw new Error('Failed to sign out');
        }
    };

    const deleteAccount = async (): Promise<void> => {
        if (!firebaseUser) throw new Error('No user logged in');
        const uid = firebaseUser.uid;

        try {
            setIsLoading(true);

            // 1. Delete Auth User first (this requires fresh login)
            await authService.deleteAuthUser();

            // 2. Only if Auth deletion succeeds, delete Firestore Data
            await userService.deleteUserFullData(uid);

            setUser(null);
            setFirebaseUser(null);
        } catch (error) {
            console.error('Delete account error:', error);
            const err = error as { code?: string; message: string };
            if (err.code === 'auth/requires-recent-login') {
                toast.error('Please log out and log in again to delete your account.');
            } else {
                toast.error('Failed to delete account: ' + (err.message || 'Unknown error'));
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                firebaseUser,
                isAuthenticated: !!user,
                isLoading,
                signInWithEmail,
                signUpWithEmail,
                signInWithGoogle,
                signInWithGithub,
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
