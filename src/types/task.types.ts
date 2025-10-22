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