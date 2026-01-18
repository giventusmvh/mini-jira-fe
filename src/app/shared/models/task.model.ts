import { Category } from "./category.model";

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task{
    id: number;
    title: string;
    description: string;
    priority: Priority;
    status: TaskStatus;
    category: Category | null;
    ownerName: string;
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface TaskRequest {
    title: string;
    description?: string;
    priority?: Priority;
    status?: TaskStatus;
    categoryId?: number;
}