import { client } from '@/utils/db'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	try {
		return new ImageResponse(
			(
				<div
					style={{
						margin: 0,
						padding: 0,
						height: '100vh',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#181A23',
					}}
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
							width: '100%',
							color: 'white',
							fontSize: '1rem',
						}}
					>
						<h1>Sorry! You can't vote again, you have already voted 😭</h1>
					</div>
				</div>
			),
			{
				width: 1200,
				height: 630,
			}
		)
	} catch (e: any) {
		console.error(e)
		return new Response(e, { status: 500 })
	}
}
