import { useStore } from '@store'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface DAO {
	name: string
	image: string
	id: string
}

const AllDAOGrid = () => {
	const { search } = useStore()
	const [daoList, setDaoList] = useState<DAO[]>([])
	const { identity, reload, fid } = useStore()
	const router = useRouter()
	const [loading, setLoading] = useState<Boolean>(true)

	const fetchData = async () => {
		const apiResponse = await fetch(`/api/getAllDAOs?id=${fid}`)
		const DAOList = (await apiResponse.json()).data as DAO[]
		setDaoList(DAOList)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		fetchData()
	}, [identity, reload])

	const joinDAO = async (id: string) => {
		await fetch('/api/joinDAO', {
			method: 'POST',
			body: JSON.stringify({
				member_id: fid,
				dao_id: id,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async res => {
				const data = await res.json()
				console.log('🚀 ~ DB response: ', data)
				toast.success('Joined DAO successfully')
				fetchData()
			})
			.catch(error => {
				console.error('🚀 ~ DB error: ', error)
			})
	}

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
								<div className="flex-1 ml-2">
									<div className="h-10 bg-gray-300 rounded-lg"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : daoList?.length > 0 ? (
				daoList
					.filter(dao => dao.name.toLowerCase().includes(search.toLowerCase()))
					.map(dao => (
						<div className="bg-white shadow-lg rounded-lg overflow-hidden" key={dao.id}>
							<img className="w-full h-auto object-cover object-center" src={dao.image} alt={dao.name} />
							<div className="p-4">
								<p className="text-primary text-xl text-center font-semibold">{dao.name}</p>
								<div className="inline-flex w-full gap-x-2">
									<button
										className="border border-primary text-primary hover:bg-primary hover:text-white p-2 w-full rounded-lg mt-2"
										onClick={() => {
											router.push(`/${dao.id}`)
										}}
									>
										Proposals
									</button>
									<button
										className="bg-primary hover:bg-black p-2 w-full rounded-lg mt-2 text-white"
										onClick={() => joinDAO(dao.id)}
									>
										Join
									</button>
								</div>
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

export default AllDAOGrid
