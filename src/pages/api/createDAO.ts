import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface BodyType {
	name: string
	description: string
	image: string
	dao: string
	creator: string
}

const createDAOHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, description, image, dao } = req.body as BodyType

	const { error } = await client.from('DAO').insert({
		name,
		description,
		image,
		id: dao,
	})

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ message: 'DAO created successfully' })
}

export default createDAOHandler
