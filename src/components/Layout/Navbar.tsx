'use client'
import Link from 'next/link'
import { useStore } from '@store'
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
			title: 'My DAOs',
			path: '/my-dao',
		},
	]
	const setIdentity = useStore(state => state.setIdentity)
	const setFid = useStore(state => state.setFid)

	return (
		<>
			<nav className="flex w-full items-center justify-between p-4 lg:px-6 fixed top-0 z-50 bg-white/50 backdrop-blur bg-blend-color-burn">
				<div className="block flex-none md:hidden">{/*<HamburgerMenu menu={menu} />*/}</div>
				<div className="flex px-16 w-full justify-between items-center">
					<div className="flex w-fit">
						<Link
							href="/"
							className="mr-2 flex flex-row w-full items-center justify-center md:w-auto lg:mr-6 divide-x"
						>
							{/*<LogoSquare className='w-5 h-5 relative p-2'/>*/}
							<div className="ml-2 flex-none text-3xl font-bold uppercase md:hidden lg:block p-2 text-primary">
								{/* {process.env.SITE_NAME} */}
								Myriad
							</div>
						</Link>
					</div>
					{menu.length != 0 && (
						<ul className="hidden gap-10 text-sm md:flex md:items-center">
							{menu.map(item => (
								<li key={item.title}>
									<Link
										href={item.path}
										className="text-violet-800 text-lg font-medium hover:text-primary hover:font-semibold underline-offset-4 hover:underline"
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					)}
					<FarcasterProvider>
						<div className="inline-flex w-fit right-10">
							<SignInButton
								onSuccess={async ({ fid, username }) => {
									const identity = new Identity(fid?.toString())
									setIdentity(identity)
									setFid(fid?.toString()!)
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
