'use client'
import DAOGrid from './DAOGrid'
import { useState } from 'react'
import CreateDAO from './CreateDAO'

const Home = () => {
	const [search, setSearch] = useState('')

	return (
		<div className="w-full h-fit z-0 mt-4 flex flex-col justify-start items-center gap-10 relative py-24 px-24">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<span className="text-2xl font-semibold">My DAOs</span>
					<DAOGrid myDAOs={false} />
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-2xl font-semibold">Available DAOs</span>
					<DAOGrid myDAOs={true} />
				</div>
			</div>
		</div>
	)
}

export default Home
