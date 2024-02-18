import { useStore } from '@store'
import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { generateProof } from '@semaphore-protocol/proof'
import { ChevronRightIcon, DoubleArrowDownIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@components/ui/drawer'

const data = [
	{
		goal: 400,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 239,
	},
	{
		goal: 300,
	},
	{
		goal: 200,
	},
	{
		goal: 278,
	},
	{
		goal: 189,
	},
	{
		goal: 349,
	},
]

function ProposalDrawer(props: any) {
	const { upvote, downvote, dao, group } = props
	const [vote, setVote] = useState('')
	const { identity } = useStore()
	const signal = (vote === 'upvote' ? 1 : vote === 'downvote' && 1) as number

	const handleSubmit = async () => {
		try {
			const fullProof = await generateProof(identity, group, dao, signal)
		} catch (error) {
			console.error('🚀 ~ error', error)
		}
		toast.success('Vote casted successfully')
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className="inline-flex justify-between items-center py-1 px-3 w-24 h-fit place-self-center gap-2 whitespace-nowrap bg-secondary border border-gray-200 hover:shadow-inner hover:bg-secondary-lite rounded-full">
					Vote <ChevronRightIcon className="h-4 w-4" />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Cast your vote anonymously</DrawerTitle>
						<DrawerDescription>Set your contribution to the proposal.</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<div className="flex items-center justify-center space-x-2">
							<button
								className={`p-4 flex flex-row items-center gap-x-3 border w-1/2 border-primary ${
									vote === 'upvote' && 'bg-primary'
								} shrink-0 rounded-xl`}
								onClick={() => {
									setVote('upvote')
								}}
							>
								<DoubleArrowUpIcon className={`${vote === 'upvote' && 'text-white'} h-10 w-20`} />
								<div className="flex flex-col w-full items-center justify-center">
									<p
										className={`${
											vote === 'upvote' ? 'text-white' : 'text-primary'
										} text-3xl font-bold`}
									>
										{upvote}
									</p>
									<span
										className={`${vote === 'upvote' ? 'text-white' : 'text-primary'} font-semibold`}
									>
										Upvote
									</span>
								</div>
							</button>
							<button
								className={`p-4 flex flex-row items-center gap-x-3 border w-1/2 border-primary ${
									vote === 'downvote' && 'bg-primary'
								}  shrink-0 rounded-xl`}
								onClick={() => {
									setVote('downvote')
								}}
							>
								<DoubleArrowDownIcon className={`${vote === 'downvote' && 'text-white'} h-10 w-20`} />
								<div className="flex flex-col w-full items-center justify-center">
									<p
										className={`${
											vote === 'downvote' ? 'text-white' : 'text-primary'
										} text-3xl font-bold`}
									>
										{downvote}
									</p>
									<span
										className={`${
											vote === 'downvote' ? 'text-white' : 'text-primary'
										}  font-semibold`}
									>
										Downvote
									</span>
								</div>
							</button>
						</div>
						<div className="mt-3 h-[120px]"></div>
					</div>
					<DrawerFooter>
						<button
							className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none"
							onClick={() => {
								if (vote && identity?.commitment) {
									handleSubmit()
								} else {
									if (!identity?.commitment) {
										toast.error('Please sign in with Farcaster')
										return
									}
									toast.error('Please cast your vote')
								}
							}}
						>
							Submit
						</button>
						<DrawerClose asChild>
							<button className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-[#1B1F3B] shadow-sm text-primary hover:text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none">
								Cancel
							</button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default ProposalDrawer
