import { client } from '@/utils/db'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const { data, error } = await client.from('Proposal').select(`title, description`).eq('id', id).single()

	console.log(data, error)

	if (error) {
		return new Response('Not found', { status: 404 })
	}

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
							backgroundColor: '#23262F',
							paddingTop: '1.5rem',
							paddingBottom: '1.5rem',
							display: 'flex',
							alignItems: 'center',
							width: '100%',
							paddingLeft: '1.75rem',
							fontSize: '2rem',
							color: 'white',
						}}
					>
						{data?.title}
					</div>
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
						<h1>{data?.description}</h1>
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
