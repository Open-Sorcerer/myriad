import { AuthKitProvider } from '@farcaster/auth-kit'

interface Props {
	children: React.ReactNode
}

export const FarcasterProvider = ({ children }: Props) => {
	const config = {
		rpcUrl: 'https://mainnet.optimism.io',
		domain: 'myriad-zk.vercel.app',
		siweUri: 'https://myriad-zk.vercel.app',
	}
	return <AuthKitProvider config={config}>{children}</AuthKitProvider>
}
