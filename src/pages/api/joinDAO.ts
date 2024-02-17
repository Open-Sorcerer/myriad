import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface BodyType {
	member_id: string
	dao_id: string
}

const createDAOHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { member_id, dao_id } = req.body as BodyType

	const { error } = await client.from('DAOMembers').insert({
		id: member_id + dao_id,
		member_id,
		dao_id,
	})

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ message: 'Joined DAO successfully' })
}

export default createDAOHandler
