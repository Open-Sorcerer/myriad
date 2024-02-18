import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

const createDAOHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query

	const { data: DAOList, error } = await client
		.from('DAOMembers')
		.select(
			`
		DAO (
			id, name, description, image
		)
	`
		)
		.neq('member_id', id as string)

	if (error) {
		return res.status(500).json({ error })
	}

	const DAOs = DAOList.map((dao: any) => {
		const { DAO, ...rest } = dao
		return { ...DAO, ...rest }
	})

	return res.status(200).json({ data: DAOs })
}

export default createDAOHandler
