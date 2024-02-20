import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface BodyType {
	title: string
	description: string
	dao: string
}

const createProposalHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, description, dao } = req.body as BodyType

	const { error } = await client.from('Proposal').insert({
		title,
		description,
		dao,
		expiry: new Date(),
		upvote: 0,
		downvote: 0,
	})

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ message: 'Proposal created successfully' })
}

export default createProposalHandler
