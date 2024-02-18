import { client as dbClient } from '@/utils/db'
import { FrameRequest, getFrameMessage } from '@coinbase/onchainkit'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
	const { searchParams } = new URL(request.url)
	const id = searchParams.get('id')

	const body: FrameRequest = await request.json()

	const { isValid, message } = await getFrameMessage(body, {
		neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
	})

	if (!isValid) {
		return new Response('Invalid Frame Request', { status: 400 })
	}

	if (message?.button === 1) {
		return new Response('Joining room', {
			status: 302,
			headers: {
				Location: `https://myriad-zk.vercel.app`,
			},
		})
	}

	try {
		return new Response(
			`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Create your Story</title>
                <meta property="og:title" content="After Vote" />
                <meta property="og:image" content="${process.env.HOST_URL}/result?id=${id}" />
                <meta name="fc:frame" content="vNext">
                <meta name="fc:frame:image" content="${process.env.HOST_URL}/result?id=${id}">
                <meta name="fc:frame:post_url" content="${process.env.HOST_URL}/showResults">
                <meta name="fc:frame:button:1" content="Visit Website">
                <meta name="fc:frame:button:1:action content="post_redirect"> 
            </head>
        <body>
        </body>
        </html>
    `,
			{
				headers: {
					'Content-Type': 'text/html',
				},
				status: 200,
			}
		)
	} catch (e: any) {
		return new Response(e, { status: 500 })
	}
}
