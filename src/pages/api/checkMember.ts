import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

const getDAOsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { dao_id } = req.query

	const { data, error } = await client
		.from('DAOMembers')
		.select('member_id')
		.eq('dao_id', dao_id as string).single()

	if (error) {
		return res.status(500).json({ error })
	}
    
	return res.status(200).json({ data })
}

export default getDAOsHandler
