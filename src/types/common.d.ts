declare module 'common' {
	export type DAO = {
		name: string
		description: string
		image: string
	}

	export type Proposal = {
		title: string
		description?: string
		dao: string
		expiry?: Date
		upvote: number
		downvote: number
		id: string
	}
}
