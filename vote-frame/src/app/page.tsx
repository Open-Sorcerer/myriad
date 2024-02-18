import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
	const fcMetadata: Record<string, string> = {
		'fc:frame': 'vNext',
		'fc:frame:post_url': `${process.env.HOST_URL}/vote`,
		'fc:frame:image': `${process.env.HOST_URL}/showProposal`,
		'fc:frame:button:1': 'Yes',
		'fc:frame:button:2': 'No',
	}

	return {
		title: 'Vote Frame',
		openGraph: {
			title: 'Vote Frame',
			images: [`${process.env.HOST_URL}/showProposal`],
		},
		other: {
			...fcMetadata,
		},
		metadataBase: new URL(`${process.env.HOST_URL}`),
	}
}

const Proposal = () => {
	return <h1> Vote Frame </h1>
}

export default Proposal
