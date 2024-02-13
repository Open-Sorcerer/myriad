import { AuthKitProvider } from '@farcaster/auth-kit'

interface Props {
	children: React.ReactNode
}

export const FarcasterProvider = ({ children }: Props) => {
	const config = {
		rpcUrl: 'https://mainnet.optimism.io',
		domain: 'example.com',
		siweUri: 'https://example.com/login',
	}
	return <AuthKitProvider config={config}>{children}</AuthKitProvider>
}
