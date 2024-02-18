declare module 'common' {
	export type DAO = {
		name: string
		description: string
		image: string
	}

<<<<<<< Updated upstream
    export type Proposal = {
        title: string;
        description?: string;
        dao: string;
        expiry?: Date;
        upvote: number;
        downvote: number;
    }
}
=======
	export type Proposal = {
		title: string
		description?: string
		dao: string
		expiry?: Date
		votes?: number
		id: string
	}
}
>>>>>>> Stashed changes
