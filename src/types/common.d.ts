declare module 'common' {
    export type DAO = {
        name: string;
        description: string;
        image: string;
    }

    export type Proposal = {
        title: string;
        description?: string;
        author: {
            name: string;
            image: string | null;
        } | null;
        timestamp?: Date;
    }
}