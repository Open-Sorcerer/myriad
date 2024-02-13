import React from 'react';
import Link from "next/link";

const DAOList = [
    {
        name: 'MangoDAO',
        image: 'https://i.imgur.com/448n6bC.jpg'
    },
    {
        name: 'Squads',
        image: 'https://i.imgur.com/CWBjdWH.png'
    },
    {
        name: 'MonkeDAO',
        image: 'https://app.realms.today/realms/MonkeDAO/img/MonkeDAO_logo.png'
    },
    {
        name: 'Elusiv',
        image: 'https://i.imgur.com/ggTWLYo.png'
    },
    {
        name: 'Glider',
        image: 'https://pbs.twimg.com/profile_images/1458164179244765184/lqJUjPYh_400x400.jpg'
    },
    {
        name: 'Helius',
        image: 'https://cdn.discordapp.com/attachments/948041727279763536/1034984434253967421/Helius_mark_orange_copy_6.png'
    },
    {
        name: 'Magic Eden',
        image: 'https://i.imgur.com/p9Ludt4.png'
    },
    {
        name: 'DED DAO',
        image: 'https://arweave.net/LzLM9GSor6FYeeFv5hv2a5oQuwcoyH3WFGbEq6_xGZk'
    }
];
const DaoGrid = (props: { search: string; }) => {
    const {search} = props;
    return (
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {DAOList
                .filter((dao) => dao.name.toLowerCase().includes(search.toLowerCase()))
                .map((dao) => (
                    <Link key={dao.name} href={"/GenericCard"}>
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img className="w-full h-auto object-cover object-center" src={dao.image} alt={dao.name}/>
                            <div className="p-4">
                                <p className="text-indigo-500 text-md font-semibold">{dao.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
        </div>
    );
};

export default DaoGrid;