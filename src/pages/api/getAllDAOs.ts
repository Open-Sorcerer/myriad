import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

const getAllDAOsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { data: DAOList } = await client.from('DAO').select('id, name, description, image')

	return res.status(200).json({ data: DAOList })
}

export default getAllDAOsHandler
