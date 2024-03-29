import Image from 'next/image'
import { Proposal } from 'common'
import ProposalDrawer from './ProposalDrawer'
import React, { useEffect, useState } from 'react'
import { useStore } from '@store'

const Timeline = (props: any) => {
	const { dao } = props
	const [proposalList, setProposalList] = useState<Proposal[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const { reload} = useStore();

	const fetchData = async () => {
		const apiResponse = await fetch(`/api/getProposals?dao=${dao}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const ProposalList = (await apiResponse.json()).data as Proposal[]
		console.log(ProposalList)
		setProposalList(ProposalList)
		setLoading(false)
	}

	useEffect(() => {
		fetchData()
	}, [dao, reload])

	return (
		<div className="w-full bg-white/70 p-8 rounded-lg">
			{loading ? (
				<div className="py-3 space-y-4 animate-pulse">
					<div className="h-4 w-40 bg-gray-300 rounded"></div>
					<div className="flex flex-row justify-between">
						<div className="h-4 w-1/2 bg-gray-300 rounded"></div>
						<button className="bg-blue-200 px-10 py-4 rounded-xl"></button>
					</div>
					<div className="flex flex-row justify-between">
						<div className="h-4 w-1/2 bg-gray-300 rounded"></div>
						<button className="bg-blue-200 px-10 py-4 rounded-xl"></button>
					</div>
				</div>
			) : proposalList.length > 0 ? (
				proposalList.map((proposal, id) => (
					<div key={id} className="py-3">
						<div className="ps-2 my-2 first:mt-0">
							<h3 className="text-xs font-medium uppercase text-gray-500">
								{proposal.expiry?.toString()}
							</h3>
						</div>
						<div className="flex gap-x-3 relative group rounded-lg hover:bg-white drop-shadow-md">
							<div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200">
								<div className="relative z-10 w-7 h-7 flex justify-center items-center">
									<div className="w-2 h-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600"></div>
								</div>
							</div>
							<div className="grow p-2">
								<h3 className="flex gap-x-1.5 font-semibold text-gray-800">{proposal.title}</h3>
								{proposal.description && (
									<p className="mt-1 text-sm text-gray-600">{proposal.description}</p>
								)}
								<button
									type="button"
									className="mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-sm rounded-lg border border-transparent font-semibold text-violet-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:pointer-events-none"
								>
									{proposal.upvote + proposal.downvote}{' '}
									{proposal.upvote + proposal.downvote === 0 ||
									proposal.upvote + proposal.downvote === 1
										? 'Vote'
										: 'Votes'}
								</button>
							</div>
							<div className="inline-flex place-self-center m-3 flex-col h-fit gap-1">
								<button
									onClick={() => {
										window.open(
											`https://warpcast.com/~/compose?embeds[]=https://vote-frame.vercel.app/${proposal.id}`
										)
									}}
									className="inline-flex justify-between items-center py-1 px-3 w-24 h-fit place-self-center gap-2 whitespace-nowrap border border-transparent bg-primary shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none rounded-full"
								>
									Cast
									<Image alt="farcaster logo" src="/farcaster.svg" width={20} height={20} />
								</button>
								<ProposalDrawer upvote={proposal.upvote} downvote={proposal.downvote} dao={dao} />
							</div>
						</div>
					</div>
				))
			) : (
				<h1 className="text-lg font-medium text-gray-500">No Proposals.</h1>
			)}
		</div>
	)
}

export default Timeline
