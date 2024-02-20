'use client'
import { useState } from 'react'
import MyDAOGrid from './MyDAOGrid'
import CreateDAO from '@app/home/CreateDAO'

const Home = () => {
	const [search, setSearch] = useState('')

	return (
		<div className="w-full h-fit z-0 mt-4 flex flex-col justify-start items-center gap-10 relative py-24 px-28">
			<div className="w-full flex flex-col gap-4">
				<div className="flex w-full h-full justify-between items-center">
					<span className="w-full text-primary text-2xl font-semibold">My DAOs</span>
					<div className="w-full flex justify-end gap-3 items-center">
						<div className="w-fit h-full">
							<div className="relative rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
								<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
									<svg
										className="flex-shrink-0 w-4 h-4 text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx="11" cy="11" r="8"></circle>
										<path d="m21 21-4.3-4.3"></path>
									</svg>
								</div>
								<input
									type="text"
									className="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
									placeholder="Search DAOs..."
									onChange={e => setSearch(e.target.value)}
								/>
							</div>
						</div>
						<CreateDAO />
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<MyDAOGrid />
				</div>
			</div>
		</div>
	)
}

export default Home
