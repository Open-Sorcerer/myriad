import Link from 'next/link'
import React, { useEffect } from 'react'

interface DAO {
	name: string
	image: string
}

const DaoGrid = (props: { search: string }) => {
	const { search } = props

	const [daoList, setDaoList] = React.useState<DAO[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const apiResponse = await fetch('/api/getDAOs')
			const DAOList = (await apiResponse.json()).data as DAO[]
			setDaoList(DAOList)
		}
		fetchData()
	}, [])

	return (
		<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{daoList.length > 0 &&
				daoList
					.filter(dao => dao.name.toLowerCase().includes(search.toLowerCase()))
					.map(dao => (
						<Link key={dao.name} href={'/GenericCard'}>
							<div className="bg-white shadow-lg rounded-lg overflow-hidden">
								<img
									className="w-full h-auto object-cover object-center"
									src={dao.image}
									alt={dao.name}
								/>
								<div className="p-4">
									<p className="text-indigo-500 text-md font-semibold">{dao.name}</p>
								</div>
							</div>
						</Link>
					))}
		</div>
	)
}

export default DaoGrid
