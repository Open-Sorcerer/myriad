'use client'
import Link from 'next/link'
import {useStore} from '@store'
import {SignInButton} from '@farcaster/auth-kit'
import {Identity} from '@semaphore-protocol/identity'
import {FarcasterProvider} from '@components/FarcasterProvider'

export default function Navbar() {
    const menu = [
        {
            title: 'Home',
            path: '/home',
        },
    ]
    const setIdentity = useStore(state => state.setIdentity)

    return (
        <>
            <nav
                className="flex w-full items-center justify-between p-4 lg:px-6 fixed top-0 z-50 bg-secondary-lite/50 backdrop-blur">
                <div className="block flex-none md:hidden">{/*<HamburgerMenu menu={menu} />*/}</div>
                <div className="flex w-full justify-between items-center">
                    <div className="flex w-fit">
                        <Link
                            href="/"
                            className="mr-2 flex flex-row w-full items-center justify-center md:w-auto lg:mr-6 divide-x"
                        >
                            <div
                                className="ml-2 flex-none text-2xl font-semibold uppercase md:hidden lg:block p-2 text-violet-600">
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
                        <div className="inline-flex w-fit right-1 saturate-200 contrast-150">
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
