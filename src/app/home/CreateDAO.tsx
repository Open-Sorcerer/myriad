import { useStore } from '@store'
import client from '@components/db'
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

const CreateDAO = () => {
	const [daoName, setDaoName] = useState('')
	const [daoDescription, setDaoDescription] = useState('')
	const [isImageUploading, setIsImageUploading] = useState(false)
	const [daoImage, setDaoImage] = useState('')
	const { identity } = useStore()

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button
					type="button"
					className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none"
				>
					Create DAO
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Create DAO</DrawerTitle>
						<DrawerDescription>Fabricate your brand-new DAO</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 pb-0">
						<form className="w-full flex flex-col justify-center items-start gap-5">
							<input
								type="text"
								className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
								placeholder="DAO Name"
								onChange={(e: any) => setDaoName(e.target.value)}
								value={daoName}
							/>
							<textarea
								className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
								placeholder="DAO Description"
								rows={4}
								onChange={(e: any) => setDaoDescription(e.target.value)}
								value={daoDescription}
							/>
							<label htmlFor="file-input" className="sr-only">
								Choose file
							</label>
							<input
								type="file"
								name="file-input"
								id="file-input"
								className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                    file:bg-gray-100 file:border-0
                                    file:me-4
                                    file:py-4 file:px-4"
								onChange={(e: any) => {
									setIsImageUploading(true)
									const formData = new FormData()
									formData.append('image', e.target.files[0])
									fetch('/api/uploadFile', {
										method: 'POST',
										body: formData,
									}).then(async (res: any) => {
										const { protocolLink } = await res.json()
										console.log(protocolLink)
										setDaoImage(`${protocolLink}/DAO_Image.png`)
										setIsImageUploading(false)
									})
								}}
							/>
						</form>
					</div>
					<DrawerFooter>
						<button
							type="button"
							onClick={async () => {}}
							className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none"
						>
							{isImageUploading ? 'Uploading Image...' : 'Create DAO'}
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
