export interface Category {
  id: string;
  name: string;
  roomIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio?: string;
  avatar?: string;
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
