import { User } from "./user";

export type Tweet = {
    id: string;
    content: string;
    likes: number;
    user: User;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}