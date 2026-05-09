export interface Project {
    id: string;
    projectName: string;
    thumbnailUrl: string;
    description: string;
    text: string;
    tags: string[]; 
    createdAt: Date;
    lastUpdatedAt: Date;
}