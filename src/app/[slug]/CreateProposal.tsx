import { useStore } from '@store'
import toast from 'react-hot-toast'
import React, { useState } from 'react'
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

const CreateDAO = (props: any) => {
	const { dao } = props
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [expiry, setExpiry] = useState<Date>()
	const { identity } = useStore()
	const createProposal = async () => {
		await fetch('/api/createProposal', {
			method: 'POST',
			body: JSON.stringify({
				title,
				description,
				dao: dao,
				expiry: expiry,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(async res => {
				const data = await res.json()
				console.log('🚀 ~ DB response: ', data)
				toast.success('Proposal created successfully')
			})
			.catch(error => {
				toast.error('Something went wrong')
				console.error('🚀 ~ DB error: ', error)
			})
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button
					type="button"
					className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none"
				>
					Create Proposal
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Create Proposal</DrawerTitle>
						<DrawerDescription>Draft your Proposal for the DAO</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<form className="w-full flex flex-col justify-center items-start gap-5">
							<input
								type="text"
								className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
								placeholder="Proposal Title"
								onChange={(e: any) => setTitle(e.target.value)}
								value={title}
							/>
							<textarea
								className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
								placeholder="Brief Description"
								rows={5}
								onChange={(e: any) => setDescription(e.target.value)}
								value={description}
							/>
							<input
								type="date"
								className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
								placeholder="Proposal Deadline"
								onChange={(e: any) => {
									setExpiry(e.target.value)
								}}
								value={expiry as any}
								min={new Date().toISOString().split('T')[0]}
							/>
						</form>
					</div>
					<DrawerFooter>
						<button
							type="button"
							className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none"
							onClick={() => {
								if (title && description && expiry && identity?.commitment) {
									createProposal()
								} else {
									if (!identity?.commitment) {
										toast.error('Please sign in with Farcaster')
										return
									}
									toast.error('Please fill the all the fields')
								}
							}}
						>
							Submit
						</button>
						<DrawerClose asChild>
							<button
								type="button"
								className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
							>
								Cancel
							</button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default CreateDAO
