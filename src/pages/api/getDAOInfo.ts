import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

const getDAOInfoHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { data, error } = await client.from('DAO').select('*')

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ data })
}

export default getDAOInfoHandler