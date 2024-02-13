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
                    Create DAO
                </button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create DAO</DrawerTitle>
                        <DrawerDescription>Fabricate your brand-new DAO</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <form className="w-full flex flex-col justify-center items-start gap-5">
                            <input type="text"
                                   className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                   placeholder="DAO Name"/>
                            <textarea
                                className="w-full py-3 px-4 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="DAO Description" rows={4}/>
                            <label htmlFor="file-input" className="sr-only">Choose file</label>
                            <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                                    file:bg-gray-100 file:border-0
                                    file:me-4
                                    file:py-4 file:px-4"/>
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