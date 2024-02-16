'use server'

import client from './db'

export const createDAO = async (name: string, description: string, image: string) => {
	const { error, data } = await client.from('Test').insert({
		id: 2,
		name: 'New',
	})
	if (error) {
		console.log(error)
	} else {
		console.log(data)
	}
}
