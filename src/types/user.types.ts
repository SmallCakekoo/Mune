export interface Category {
  id: string;
  name: string;
  roomIds: string[];
}

export interface FavoriteSong {
  title: string;
  artist: string;
  albumCover: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio?: string | null;
  avatar?: string | null;
  favoriteSongs?: FavoriteSong[];
  socialLinks?: {
    discord?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  stats?: {
    roomsCreated: number;
    minutesSpent: number;
  };
  categories?: Category[];
  createdAt?: Date | string;
}
