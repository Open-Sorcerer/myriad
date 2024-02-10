import React from 'react';
import {Proposal} from 'common';
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
import {ChevronRightIcon, MinusIcon, PlusIcon} from "@radix-ui/react-icons";
import {Bar, BarChart, ResponsiveContainer} from "recharts"

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]

const ProposalDrawer = (props: { proposal: Proposal; }) => {
    const {proposal} = props;
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button className="flex items-center py-2 px-3 w-fit h-fit place-self-center gap-2 whitespace-nowrap border border-gray-200 rounded-full">More <ChevronRightIcon className="h-4 w-4"/></button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your contribution to the proposal.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                            <button
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(-10)}
                                disabled={goal <= 200}
                            >
                                <MinusIcon className="h-4 w-4"/>
                                <span className="sr-only">Decrease</span>
                            </button>
                            <div className="flex-1 text-center">
                                <div className="text-7xl font-bold tracking-tighter">
                                    {goal}
                                </div>
                                <div className="text-[0.70rem] uppercase text-muted-foreground">
                                    Myriad Points
                                </div>
                            </div>
                            <button
                                className="h-8 w-8 shrink-0 rounded-full"
                                onClick={() => onClick(10)}
                                disabled={goal >= 400}
                            >
                                <PlusIcon className="h-4 w-4"/>
                                <span className="sr-only">Increase</span>
                            </button>
                        </div>
                        <div className="mt-3 h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <Bar
                                        dataKey="goal"
                                        style={
                                            {
                                                fill: "hsl(var(--foreground))",
                                                opacity: 0.9,
                                            } as React.CSSProperties
                                        }
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <DrawerFooter>
                        <button>Submit</button>
                        <DrawerClose asChild>
                            <button>Cancel</button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default ProposalDrawer;