import { useState, useEffect } from 'react';
import { getUserById } from '../services/user.service';
import type { User } from '../types/user.types';

const userCache: Record<string, User> = {};
const pendingPromises: Record<string, Promise<User | null>> = {};

/**
 * Hook to resolve user data (name, avatar, etc.) by userId.
 * Uses a global cache and de-duplicates requests.
 */
export const useUserResolver = (userId?: string) => {
    const [user, setUser] = useState<User | null>(userId ? userCache[userId] || null : null);
    const [isLoading, setIsLoading] = useState(!user && !!userId);

    useEffect(() => {
        if (!userId) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        if (userCache[userId]) {
            setUser(userCache[userId]);
            setIsLoading(false);
            return;
        }

        const fetchUser = async () => {
            setIsLoading(true);
            try {
                // De-duplicate concurrent requests for the same userId
                if (!pendingPromises[userId]) {
                    pendingPromises[userId] = getUserById(userId);
                }
                
                const userData = await pendingPromises[userId];
                
                if (userData) {
                    userCache[userId] = userData;
                    setUser(userData);
                }
            } catch (error) {
                console.error(`Error resolving user ${userId}:`, error);
            } finally {
                setIsLoading(false);
                delete pendingPromises[userId];
            }
        };

        fetchUser();
    }, [userId]);

    return { user, isLoading };
};

/**
 * Hook to resolve multiple users at once.
 */
export const useUsersResolver = (userIds: string[]) => {
    const [users, setUsers] = useState<Record<string, User>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            if (userIds.length === 0) {
                setIsLoading(false);
                return;
            }

            const results: Record<string, User> = {};
            const toFetch: string[] = [];

            userIds.forEach(id => {
                if (userCache[id]) {
                    results[id] = userCache[id];
                } else {
                    toFetch.push(id);
                }
            });

            if (toFetch.length === 0) {
                setUsers(results);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const fetchedUsers = await Promise.all(
                    toFetch.map(async (id) => {
                        if (!pendingPromises[id]) {
                            pendingPromises[id] = getUserById(id);
                        }
                        return { id, data: await pendingPromises[id] };
                    })
                );

                fetchedUsers.forEach(({ id, data }) => {
                    if (data) {
                        userCache[id] = data;
                        results[id] = data;
                    }
                    delete pendingPromises[id];
                });

                setUsers(results);
            } catch (error) {
                console.error('Error resolving users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [JSON.stringify(userIds)]); // Simple way to watch array changes

    return { users, isLoading };
};
