export interface TestProps {
    id: number;
    name: string;
    email: string;
    details: {
        description: string;
        isActive: boolean;
        createdAt: Date;
    };
    tags: string[];
    metadata: {
        author: {
            name: string;
            email: string;
        };
        version: number;
    };
}