import { useStore } from '@store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface DAO {
	name: string
	image: string
	id: string
}

const MyDAOGrid = () => {
	const { search } = useStore()
	const [daoList, setDaoList] = useState<DAO[]>([])
	const { fid, reload } = useStore()
	const [loading, setLoading] = useState<Boolean>(true)
	const router = useRouter()

	const fetchData = async () => {
		const apiResponse = await fetch(`/api/getDAOs?id=${fid}`)
		const DAOList = (await apiResponse.json()).data as DAO[]
		setDaoList(DAOList)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [fid, reload])

	return (
		<div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
			{loading ? (
				<div className="py-3 animate-pulse">
					<div className="w-[20rem] bg-gray-200 shadow-lg rounded-lg overflow-hidden cursor-pointer">
						<div className="h-48 bg-gray-300"></div>
						<div className="p-4">
							<div className="h-6 bg-gray-300 mb-4"></div>
							<div className="flex justify-between">
								<div className="flex-1 mr-2">
									<div className="h-10 bg-gray-300 rounded-lg"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : daoList.length > 0 ? (
				daoList
					.filter(dao => dao.name.toLowerCase().includes(search.toLowerCase()))
					.map(dao => (
						<div className="bg-white shadow-lg rounded-lg overflow-hidden" key={dao.id}>
							<img className="w-full h-auto object-cover object-center" src={dao.image} alt={dao.name} />
							<div className="p-4">
								<p className="text-indigo-500 text-xl text-center font-semibold">{dao.name}</p>
								<button
									className="border border-primary text-primary hover:bg-primary hover:text-white p-2 w-full rounded-lg mt-2"
									onClick={() => {
										router.push(`/${dao.id}`)
									}}
								>
									Proposals
								</button>
							</div>
						</div>
					))
			) : (
				<h1 className="text-lg font-medium text-gray-700">
					{fid ? 'Please create a new DAO.' : 'Please sign in first.'}
				</h1>
			)}
		</div>
	)
}

export default MyDAOGrid
