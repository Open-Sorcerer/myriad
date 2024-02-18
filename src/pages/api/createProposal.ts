import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface BodyType {
	title: string
	description: string
	dao: string
	expiry: Date
}

const createProposalHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, description, dao, expiry } = req.body as BodyType

	const { error } = await client.from('Proposal').insert({
		title,
		description,
		dao,
		expiry,
		votes: 0,
	})

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ message: 'Proposal created successfully' })
}

export default createProposalHandler
