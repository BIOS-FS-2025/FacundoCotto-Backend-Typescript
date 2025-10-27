
export enum Subject {
    GENERAL = "general",
    MATH = "math",
    PHYSICS = "physics",
    CHEMISTRY = "chemistry",
    BIOLOGY = "biology",
    SCIENCE = "science",
    HISTORY = "history",
    LANGUAGE = "language",
    ART = "art",
    MUSIC = "music",
    PHYSICAL_EDUCATION = "physical_education",
    COMPUTER_SCIENCE = "computer_science",
    OTHER = "other",
}

export enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export interface TaskInput {
    title: string;
    description: string;
    dueDate?: Date | null;
    priority?: Priority[];
    subject?: Subject[];
}

export interface TaskResponse extends TaskInput {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    completed: boolean;
}

export interface TaskFilter{
    page?: number;
    limit?: number;
    search?: string;
    dueDate?: Date | null;
    priority?: Priority[];
    subject?: Subject[];
    sortBy?: string;  
    sortOrder?: 'asc' | 'desc';
    completed?: boolean;
    $or?: { title?: { $regex: string; $options: string }; description?: { $regex: string; $options: string } }[];
}

export interface TasksQuery extends TaskFilter {
    sortOptions?: { [key: string]: 1 | -1 };
    skip?: number;
}