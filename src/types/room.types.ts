export type RoomPrivacy = "public" | "private";

export interface RoomOwner {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  privacy: RoomPrivacy;
  password?: string;
  owner: RoomOwner;
  createdAt: Date | string;
  updatedAt: Date | string;
  lastActivity?: Date | string;
  songCount?: number;
  memberCount?: number;
  members?: RoomOwner[];
}
