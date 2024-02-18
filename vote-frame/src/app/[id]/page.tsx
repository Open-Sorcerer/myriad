import { Metadata } from 'next'

interface Props {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const fcMetadata: Record<string, string> = {
		'fc:frame': 'vNext',
		'fc:frame:post_url': `${process.env.HOST_URL}/vote?id=${params.id}&time${Date.now()}`,
		'fc:frame:image': `${process.env.HOST_URL}/showProposal?id=${params.id}`,
		'fc:frame:button:1': 'Yes 🔼',
		'fc:frame:button:2': 'No 🔽',
	}

	return {
		title: 'Vote Frame',
		openGraph: {
			title: 'Vote Frame',
			images: [`${process.env.HOST_URL}/showProposal?id=${params.id}`],
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
