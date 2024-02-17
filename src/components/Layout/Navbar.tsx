'use client'
import Link from 'next/link'
import { useStore } from '@store'
import CreateDAO from '@app/home/CreateDAO'
import { SignInButton } from '@farcaster/auth-kit'
import { Identity } from '@semaphore-protocol/identity'
import { FarcasterProvider } from '@components/FarcasterProvider'

export default function Navbar() {
	const menu = [
		{
			title: 'Home',
			path: '/home',
		},
		{
			title: 'Dashboard',
			path: '/dashboard',
		},
		{
			title: 'VoteUI',
			path: '/GenericCard',
		},
	]
	const setIdentity = useStore(state => state.setIdentity)
	const { setSearch } = useStore()

	return (
		<>
			<nav className="flex w-full items-center justify-between p-4 lg:px-6 fixed top-0 z-50 bg-black/80">
				<div className="block flex-none md:hidden">{/*<HamburgerMenu menu={menu} />*/}</div>
				<div className="flex w-full justify-items-end items-center">
					<div className="flex w-fit">
						<Link
							href="/"
							className="mr-2 flex flex-row w-full items-center justify-center md:w-auto lg:mr-6 divide-x"
						>
							{/*<LogoSquare className='w-5 h-5 relative p-2'/>*/}
							<div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block p-2 text-white">
								{/* {process.env.SITE_NAME} */}
								Myriad
							</div>
						</Link>
						{menu.length != 0 && (
							<ul className="hidden gap-6 text-sm md:flex md:items-center">
								{menu.map(item => (
									<li key={item.title}>
										<Link
											href={item.path}
											className="text-neutral-100 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="flex w-full h-full justify-between items-center">
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
					<FarcasterProvider>
						<div className="w-full ml-4">
							<SignInButton
								onSuccess={async ({ fid, username }) => {
									const identity = new Identity(fid?.toString())
									setIdentity(identity)
									console.log('details', fid, username, identity.commitment)
								}}
							/>
						</div>
					</FarcasterProvider>
				</div>
			</nav>
		</>
	)
}
