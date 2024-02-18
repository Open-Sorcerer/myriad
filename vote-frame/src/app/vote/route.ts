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

	const buttonId = message?.button

	const { data: daoId } = await dbClient.from('Proposal').select('dao').eq('id', id).single()

	console.log('daoId', daoId)

	const { data: memberData } = (await dbClient
		.from('DAOMembers')
		.select('member_id')
		.eq('member_id', message?.interactor?.fid.toString())
		.eq('dao_id', daoId?.dao)) as { data: { member_id: string }[] }

	const { data: proposal } = await dbClient
		.from('Votes')
		.select('fid')
		.eq('proposal_id', id)
		.eq('fid', message?.interactor?.fid.toString())

	if (proposal?.length === 0) {
		const { error } = await dbClient.from('Votes').insert({
			proposal_id: id,
			fid: message?.interactor?.fid.toString(),
		})
		console.log(error)
	}

	console.log('memberData', memberData, message?.interactor?.fid)

	if (memberData?.[0].member_id !== message?.interactor?.fid?.toString()) {
		try {
			return new Response(
				`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Create your Proposal</title>
                    <meta property="og:title" content="After Vote" />
                    <meta property="og:image" content="${process.env.HOST_URL}/sorry" />
                    <meta name="fc:frame" content="vNext">
                    <meta name="fc:frame:image" content="${process.env.HOST_URL}/sorry">
                    <meta name="fc:frame:post_url" content="${
						process.env.HOST_URL
					}/showResults?id=${id}&time=${Date.now()}">
                    <meta name="fc:frame:button:1" content="Show Results">
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

	if (proposal?.[0]?.fid === message?.interactor?.fid?.toString()) {
		try {
			return new Response(
				`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Create your Proposal</title>
                    <meta property="og:title" content="After Vote" />
                    <meta property="og:image" content="${process.env.HOST_URL}/sorryVote" />
                    <meta name="fc:frame" content="vNext">
                    <meta name="fc:frame:image" content="${process.env.HOST_URL}/sorryVote">
                    <meta name="fc:frame:post_url" content="${
						process.env.HOST_URL
					}/showResults?id=${id}&time=${Date.now()}">
                    <meta name="fc:frame:button:1" content="Show Results">
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

	const { data: votes } = await dbClient.from('Proposal').select(`upvote, downvote`).eq('id', id).single()

	console.log('votes', votes)

	if (buttonId === 1) {
		const { error } = await dbClient
			.from('Proposal')
			.update({ upvote: Number(votes?.upvote) + 1 })
			.eq('id', id)
		if (error) {
			return new Response('Not found', { status: 404 })
		}
	}

	if (buttonId === 2) {
		const { error } = await dbClient
			.from('Proposal')
			.update({ downvote: Number(votes?.downvote) + 1 })
			.eq('id', id)
		if (error) {
			return new Response('Not found', { status: 404 })
		}
	}

	try {
		return new Response(
			`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Create your Story</title>
                <meta property="og:title" content="After Vote" />
                <meta property="og:image" content="${process.env.HOST_URL}/afterVote?id=${id}&vote=${buttonId}" />
                <meta name="fc:frame" content="vNext">
                <meta name="fc:frame:image" content="${process.env.HOST_URL}/afterVote?id=${id}&vote=${buttonId}">
                <meta name="fc:frame:post_url" content="${
					process.env.HOST_URL
				}/showResults?id=${id}&time=${Date.now()}">
                <meta name="fc:frame:button:1" content="Show Results">
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
