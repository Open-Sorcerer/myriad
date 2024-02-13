import React from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@components/ui/drawer";


const CreateDAO = () => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button type="button"
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none">
                    Create Proposal
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create Proposal</DrawerTitle>
                        <DrawerDescription>Draft your brand-new Proposal</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <form className="w-full flex flex-col justify-center items-start gap-5">
                            <input type="text"
                                   className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                   placeholder="Proposal Title"/>
                            <textarea
                                className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="Brief Description" rows={5}/>
                        </form>
                    </div>
                    <DrawerFooter>
                        <button type="button"
                                className="py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#1B1F3B] shadow-sm text-white hover:bg-black  disabled:opacity-50 disabled:pointer-events-none">
                            Submit
                        </button>
                        <DrawerClose asChild>
                            <button type="button"
                                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                                Cancel
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default CreateDAO;