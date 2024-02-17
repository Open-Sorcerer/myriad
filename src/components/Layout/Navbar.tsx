'use client'
import Link from 'next/link'
import {useStore} from '@store'
import {SignInButton} from '@farcaster/auth-kit'
import {Identity} from '@semaphore-protocol/identity'
import {FarcasterProvider} from '@components/FarcasterProvider'
import Image from "next/image";

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

    return (
        <>
            <nav className="flex w-full items-center justify-between p-4 lg:px-6 fixed top-0 z-50 bg-white/50 backdrop-blur bg-blend-color-burn">
                <div className="block flex-none md:hidden">{/*<HamburgerMenu menu={menu} />*/}</div>
                <div className="flex w-full justify-between items-center">
                    <div className="flex w-fit">
                        <Link
                            href="/"
                            className="mr-2 flex flex-row w-full items-center justify-center md:w-auto lg:mr-6 divide-x"
                        >
                            {/*<LogoSquare className='w-5 h-5 relative p-2'/>*/}
                            <div
                                className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block p-2 text-black">
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
                                            className="text-neutral-800 underline-offset-4 hover:text-black hover:underline"
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <FarcasterProvider>
                        <div className="inline-flex w-fit fixed right-10">
                            <div
                                className="absolute top-0 right-0 bottom-0 left-0 bg-primary inline-flex justify-center items-center gap-3 text-base text-white font-semibold rounded-md pointer-events-none"
                            >
                                <Image alt="farcaster logo" src="/farcaster.svg" width={25} height={25} />
                                Sign In
                            </div>
                            <SignInButton
                                onSuccess={async ({fid, username}) => {
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
