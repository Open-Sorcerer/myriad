'use client'
import Timeline from './Timeline'
import React, { useState } from 'react'
import CreateProposal from './CreateProposal'

// TODO: Implement the GenericCard component dynamically and remove this placeholder component
const GenericCard = () => {
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState('all')
	const [sort, setSort] = useState('newest')
	return (
		<div className="w-full h-fit z-0 flex flex-col justify-start items-center gap-10 relative py-24 px-24">
			<div className="flex w-full h-full justify-between items-center z-10">
				<h1 className="text-4xl font-bold">MangoDAO</h1>
				<div className="flex w-fit h-full gap-5">
					{/* Search Bar */}
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
							placeholder="Search Proposals..."
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					{/* Filter Dropdown */}
					<div className="hs-dropdown relative inline-flex w-36">
						<button
							id="hs-dropdown-default"
							type="button"
							className="hs-dropdown-toggle w-full py-3 px-4 inline-flex justify-between items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						>
							Filter: {filter === 'all' ? 'All' : 'Active'}
							<svg
								className="hs-dropdown-open:rotate-180 w-4 h-4"
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
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>
						<ul
							className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-40 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
							aria-labelledby="hs-dropdown-default"
						>
							<li
								onClick={() => setFilter('all')}
								className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
							>
								All
							</li>
							<li
								onClick={() => setFilter('active')}
								className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
							>
								Active
							</li>
							<li
								onClick={() => setFilter('inactive')}
								className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
							>
								Completed
							</li>
						</ul>
					</div>
					{/* Sorting */}
					<div className="hs-dropdown relative inline-flex w-36">
						<button
							id="hs-dropdown-default"
							type="button"
							className="hs-dropdown-toggle w-full py-3 px-4 inline-flex justify-between items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						>
							Sort: {sort === 'newest' ? 'Newest' : 'Oldest'}
							<svg
								className="hs-dropdown-open:rotate-180 w-4 h-4"
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
								<path d="m6 9 6 6 6-6" />
							</svg>
						</button>
						<ul
							className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-40 bg-white shadow-md rounded-lg p-2 mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
							aria-labelledby="hs-dropdown-default"
						>
							<li
								onClick={() => setSort('newest')}
								className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
							>
								Newest
							</li>
							<li
								onClick={() => setSort('oldest')}
								className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
							>
								Oldest
							</li>
						</ul>
					</div>
					<CreateProposal />
				</div>
			</div>

			{/*  Rest  */}
			<Timeline search={search} sort={sort} />
		</div>
	)
}

GenericCard.propTypes = {}

export default GenericCard
