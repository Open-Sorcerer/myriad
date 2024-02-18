import Link from 'next/link'
import { useStore } from '@store'
import toast from 'react-hot-toast'
import React, { useEffect } from 'react'

interface DAO {
	name: string
	image: string
	id: string
}

const MyDAOGrid = () => {
	const { search } = useStore()
	const [daoList, setDaoList] = React.useState<DAO[]>([])
	const { identity, reload } = useStore()

	const fetchData = async () => {
		const apiResponse = await fetch(`/api/getDAOs?id=${identity?.commitment?.toString()}`)
		const DAOList = (await apiResponse.json()).data as DAO[]
		setDaoList(DAOList)
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [identity, reload])

	return (
		<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{daoList.length > 0 &&
				daoList
					.filter(dao => dao.name.toLowerCase().includes(search.toLowerCase()))
					.map(dao => (
						<div className="bg-white shadow-lg rounded-lg overflow-hidden" key={dao.id}>
							<img className="w-full h-auto object-cover object-center" src={dao.image} alt={dao.name} />
							<div className="p-4">
								<p className="text-indigo-500 text-xl text-center font-semibold">{dao.name}</p>
							</div>
						</div>
					))}
		</div>
	)
}

export default MyDAOGrid
