import client from '@components/db'
import { nanoid, customAlphabet } from 'nanoid'
import { NextApiRequest, NextApiResponse } from 'next'
import { Identity } from '@semaphore-protocol/identity'

interface BodyType {
	name: string
	description: string
	image: string
	id: string
}

const createDAOHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { name, description, image, id } = req.body as BodyType

	const nanoid = customAlphabet('1234567890', 10)

	const { error } = await client.from('DAO').insert({
		name,
		description,
		image,
		creator: id,
		id: nanoid(),
	})

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ message: 'DAO created successfully' })
}

export default createDAOHandler
