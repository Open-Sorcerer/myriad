import './globals.css'
import '@farcaster/auth-kit/styles.css'
import Spliner from '@components/Spliner'
import { FC, PropsWithChildren } from 'react'
import Navbar from '@components/Layout/Navbar'
import PrelineScript from '@components/PrelineScript'

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
	return (
		<html lang="en">
			<PrelineScript />
			<body>
				<div className="w-full h-full relative bg-fixed flex-1 justify-center text-black">
					<Navbar />
					<Spliner />
					{children}
				</div>
			</body>
		</html>
	)
}

export default RootLayout
