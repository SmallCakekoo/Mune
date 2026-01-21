import type { User } from '../types/user.types';
import type { Room } from '../types/room.types';

export const MOCK_USERS: Record<string, User> = {
    'user1': {
        id: 'user1',
        name: 'Snow Cat',
        username: 'snow_cat',
        email: 'snow@mune.com',
        bio: "The fluffy developer of this platform. I love cats and code.",
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
        stats: {
            roomsCreated: 12,
            minutesSpent: 1240,
        }
    },
    'user2': {
        id: 'user2',
        name: 'Soviet Cat',
        username: 'soviet_cat_nyan',
        email: 'soviet@mune.com',
        bio: "Building the future of music collaboration. One pixel at a time.",
        avatar: '/src/assets/images/cats/Cat (2).png',
        favoriteSongs: [
            {
                title: 'alice - pogo',
                artist: 'pogo',
                albumCover: '/src/assets/images/album/alice - pogo.jpg'
            }
        ],
        socialLinks: {
            github: '@sovietcat',
            twitter: '@soviet_cat',
        },
        stats: {
            roomsCreated: 42,
            minutesSpent: 8540,
        }
    },
    'user3': {
        id: 'user3',
        name: 'DJ Meow',
        username: 'dj_meow',
        email: 'djmeow@mune.com',
        bio: "Scratching records and chasing laser pointers.",
        avatar: '/src/assets/images/cats/Cat (5).png',
        favoriteSongs: [
            {
                title: 'cat song',
                artist: 'meow records',
                albumCover: '/src/assets/images/album/cat song.jpg'
            }
        ],
        stats: {
            roomsCreated: 5,
            minutesSpent: 500,
        }
    },
    'migration_user': {
        id: 'migration_user',
        name: 'Migration Bot',
        username: 'migration_bot',
        email: 'migration@mune.com',
        bio: "I move things around.",
        avatar: '',
        favoriteSongs: [],
        stats: { roomsCreated: 0, minutesSpent: 0 }
    }
};

export const MOCK_USER_ROOMS: Record<string, Room[]> = {
    'user1': [
        {
            id: '1',
            name: '¡Work in mune!',
            description: 'My creative space',
            privacy: 'public',
            owner: { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            members: [{ id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' }],
            songCount: 15,
            memberCount: 5,
            lastActivity: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
    'user2': [
        {
            id: '3',
            name: 'PixelDNA :)',
            description: 'Creative projects and pixel art discussions.',
            privacy: 'public',
            owner: { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            members: [
                { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
                { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' }
            ],
            songCount: 21,
            memberCount: 7,
            lastActivity: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
    'user3': [
        {
            id: '4',
            name: 'Meow Mix',
            description: 'Electronic music and cats.',
            privacy: 'public',
            owner: { id: 'user3', name: 'DJ Meow', avatar: '/src/assets/images/cats/Cat (5).png' },
            members: [{ id: 'user3', name: 'DJ Meow', avatar: '/src/assets/images/cats/Cat (5).png' }],
            songCount: 42,
            memberCount: 12,
            lastActivity: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],
    'migration_user': [
        {
            id: 'm1',
            name: '¡Work in mune!',
            description: 'My creative space where ideas and music flow together. Join us for a productive session!',
            privacy: 'public',
            owner: { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            members: [],
            songCount: 34,
            memberCount: 5,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'm2',
            name: 'DCA',
            description: 'Design and code. A private space for focused developers.',
            privacy: 'public',
            owner: { id: 'user1', name: 'Snow Cat', avatar: '/src/assets/images/cats/Cat (9).png' },
            members: [],
            songCount: 39,
            memberCount: 3,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'm3',
            name: 'PixelDNA :)',
            description: 'Creative projects and pixel art discussions.',
            privacy: 'public',
            owner: { id: 'user2', name: 'Soviet Cat', avatar: '/src/assets/images/cats/Cat (2).png' },
            members: [],
            songCount: 21,
            memberCount: 7,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'm4',
            name: '¡bRUUh!',
            description: 'The loudest music room in the city. Feel the bass!',
            privacy: 'public',
            owner: { id: 'user4', name: 'Cartoon Cat', avatar: '/src/assets/images/cats/Cat (4).png' },
            members: [],
            songCount: 124,
            memberCount: 3,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 9), // 9 hours ago
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'm5',
            name: 'AE is my passion',
            description: 'After Effects workspace. Motion graphics lovers only.',
            privacy: 'public',
            owner: { id: 'user5', name: 'Tiny Music Cat', avatar: '/src/assets/images/cats/Cat (6).png' },
            members: [],
            songCount: 9,
            memberCount: 2,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'm6',
            name: 'Celeste.',
            description: 'Beautiful workspace inspired by the mountains.',
            privacy: 'public',
            owner: { id: 'user6', name: 'French Cat', avatar: '/src/assets/images/cats/Cat (7).png' },
            members: [],
            songCount: 123,
            memberCount: 3,
            lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 hours ago
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ]
};
