import client from '@components/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface QueryType {
	dao: string
}

const isQueryType = (query: any): query is QueryType => {
	return query && typeof query.dao === 'string'
}

const getProposalHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!isQueryType(req.query)) {
		return res.status(400).json({ error: 'Invalid query parameters' })
	}

	const { dao } = req.query

	const { data, error } = await client.from('Proposal').select(`*`).eq('dao', dao)

	if (error) {
		return res.status(500).json({ error })
	}

	return res.status(200).json({ data })
}

export default getProposalHandler
