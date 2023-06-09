import { Layout } from "@/components/Layout"
import { calculateTimeDifference } from "@/utils/calculateTimeDifference";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react"
import flipper from "@/assets/logos/logo-1.svg"

interface Proposal {
    id: number,
    address: string,
    proposer: { name?: string, username?: string, address: string, },
    title: string,
    description: string,
    options: { title: string, votes: string[] }[],
    open: boolean,
    totalVotes: number,
    executed: boolean,
    createdAt: Date,
}

const DAO = () => {
    const router = useRouter();

    const [proposals] = useState<Proposal[]>([
        {
            id: 1,
            address: "0x1234567890123456789012345678901234567890",
            proposer: {
                name: "John Doe",
                username: "johndoe",
                address: "0x1234567890123456789012345678901234567890",
            },
            title: "Proposal 1",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x1234567890123456789012345678901234567890",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0x1234567890123456789012345678901234567890",
                        "0x1234567890123456789012345678901234567890",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0x1234567890123456789012345678901234567890",
                        "0x1234567890123456789012345678901234567890",
                    ],
                },
            ],
            totalVotes: 5,
            open: true,
            executed: false,
            createdAt: new Date("2021-10-10"),
        },
        {
            id: 2,
            address: "0x246810121416182022242628303234363840424446",
            proposer: {
                name: "Alice Smith",
                username: "alicesmith",
                address: "0x246810121416182022242628303234363840424446",
            },
            title: "Proposal 2",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x246810121416182022242628303234363840424446",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0x13579acebdf02468acfdb97531eca86420bdfeca",
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                        "0x9876543210fedcba9876543210fedcba98765432",
                    ],
                },
            ],
            totalVotes: 3,
            open: false,
            executed: false,
            createdAt: new Date("2022-03-05"),
        },
        {
            id: 3,
            address: "0x13579acebdf02468acfdb97531eca86420bdfeca",
            proposer: {
                name: "David Johnson",
                username: "davidjohnson",
                address: "0x13579acebdf02468acfdb97531eca86420bdfeca",
            },
            title: "Proposal 3",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x13579acebdf02468acfdb97531eca86420bdfeca",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                        "0x1234567890123456789012345678901234567890",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
            ],
            totalVotes: 7,
            open: false,
            executed: true,
            createdAt: new Date("2022-06-15"),
        },
        {
            id: 4,
            address: "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
            proposer: {
                name: "Sophia Taylor",
                username: "sophiataylor",
                address: "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
            },
            title: "Proposal 4",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x9876543210fedcba9876543210fedcba98765432",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                        "0x13579acebdf02468acfdb97531eca86420bdfeca",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
            ],
            totalVotes: 5,
            open: true,
            executed: false,
            createdAt: new Date("2022-09-20"),
        },
        {
            id: 5,
            address: "0xaaaaaaaabbbbbbbbcccccccdddddddeeeeeeeeff",
            proposer: {
                name: "Oliver Brown",
                username: "oliverbrown",
                address: "0xaaaaaaaabbbbbbbbcccccccdddddddeeeeeeeeff",
            },
            title: "Proposal 5",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x1234567890123456789012345678901234567890",
                        "0x246810121416182022242628303234363840424446",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0xaaaaaaaabbbbbbbbcccccccdddddddeeeeeeeeff",
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                    ],
                },
            ],
            totalVotes: 6,
            open: true,
            executed: false,
            createdAt: new Date("2022-12-25"),
        },
        {
            id: 6,
            address: "0x9876543210fedcba9876543210fedcba98765432",
            proposer: {
                name: "Mia Davis",
                username: "miadavis",
                address: "0x9876543210fedcba9876543210fedcba98765432",
            },
            title: "Proposal 6",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0x13579acebdf02468acfdb97531eca86420bdfeca",
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0x9876543210fedcba9876543210fedcba98765432",
                    ],
                },
            ],
            totalVotes: 4,
            open: true,
            executed: false,
            createdAt: new Date("2023-02-10"),
        },
        {
            id: 7,
            address: "0xfedcba9876543210fedcba9876543210fedcba98",
            proposer: {
                name: "William Wilson",
                username: "williamwilson",
                address: "0xfedcba9876543210fedcba9876543210fedcba98",
            },
            title: "Proposal 7",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget ultricies aliquam, nunc nisl aliquet nunc, vitae aliquam nisl nunc vitae nisl.",
            options: [
                {
                    title: "Approve",
                    votes: [
                        "0x246810121416182022242628303234363840424446",
                    ],
                },
                {
                    title: "Disapprove",
                    votes: [
                        "0x13579acebdf02468acfdb97531eca86420bdfeca",
                        "0xdddddeeeefffffgggggghhhhhiiiiijjjjjjkkk",
                    ],
                },
                {
                    title: "Abstain",
                    votes: [
                        "0xfedcba9876543210fedcba9876543210fedcba98",
                        "0x9876543210fedcba9876543210fedcba98765432",
                        "0xaaaaaaaabbbbbbbbcccccccdddddddeeeeeeeeff",
                    ],
                },
            ],
            totalVotes: 7,
            open: true,
            executed: false,
            createdAt: new Date("2023-05-09"),
        },
    ])

    return (
        <Layout title={"DAO"} navbar={true}>
            <div className="flex-1 flex max-w-full justify-center">
                {/* Left */}
                <div className='hidden sm:w-1/4 sm:flex flex-col items-center border-l-[1px] border-[#bfbfbf] py-8'>
                    <div className="w-1/3 border-2 border-gray-300 rounded-full h-auto flex items-center justify-center py-12 px-2">
                        <Image src={flipper} alt="Flipper" />
                    </div>

                    <div className="flex flex-col items-center w-full px-4 mt-4">
                        <p className="text-2xl font-medium">Flipper DAO</p>

                        <div className="flex flex-col mt-4">
                            <Link href="/dao" className="text-blue-500 hover:underline">
                                {router.pathname === "/dao" ? "|" : ""} Proposals
                            </Link>

                            <Link href="/dao/create" className="text-blue-500 hover:underline">
                                {router.pathname === "/dao/create" ? "|" : ""} Create Proposal
                            </Link>
                        </div>
                    </div>
                </div>

                {/* DAO Feed */}
                <div className="w-full sm:w-1/2 flex flex-col border-x-[1px] border-[#bfbfbf] min-h-screen h-full">
                    <div className="flex justify-between px-4 py-8 items-center border-b border-grey-400">
                        <p className="text-2xl font-medium">Proposals</p>

                        <div className="flex">
                            <input type="text" placeholder="Search" className="border border-gray-400 rounded-l-lg p-2" />

                            <select className="border border-gray-400 rounded-r-lg p-2">
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="executed">Executed</option>
                            </select>
                        </div>
                    </div>

                    {
                        proposals.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((proposal: Proposal, index: number) => (
                            <Link href={"/dao/" + proposal.address} className="border-b border-gray-400 flex flex-col py-4 w-full" key={index}>
                                <div className="flex flex-col justify-between w-full px-4 mb-4">
                                    <div className="flex">
                                        <div className="ml-4 w-full">
                                            <div className="flex justify-between w-full">
                                                <Link href={"/profile/" + proposal.proposer.address} className="flex flex-col">
                                                    <div className="flex flex-col items-start mb-2">
                                                        {proposal.proposer.name && <p className="text-lg font-semibold">{proposal.proposer.name}</p>}

                                                        {proposal.proposer.username && <p className="text-gray-400">@{proposal.proposer.username}</p>}
                                                    </div>

                                                    <p className="text-gray-400">
                                                        {proposal.proposer.address.trim().slice(0, 6)}...{proposal.proposer.address.trim().slice(-4)}
                                                    </p>
                                                </Link>

                                                <div className="flex flex-col items-end">
                                                    <p className="text-gray-400">{calculateTimeDifference(proposal.createdAt.toDateString())}</p>

                                                    {/* Show if it's either open (open: true and executed: false), executed (open: false and executed: true) or abstained (open: false and executed: false) with a "Card" with the status */}
                                                    {proposal.open && !proposal.executed && <div className="flex items-center justify-center bg-green-500 rounded-full h-8 w-24">
                                                        <p className="text-white">Open</p>
                                                    </div>}

                                                    {!proposal.open && proposal.executed && <div className="flex items-center justify-center bg-fuchsia-500 rounded-full h-8 w-24">
                                                        <p className="text-white">Executed</p>
                                                    </div>}

                                                    {!proposal.open && !proposal.executed && <div className="flex items-center justify-center bg-gray-500 rounded-full h-8 w-24">
                                                        <p className="text-white">Abstained</p>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex justify-between w-full px-4 mt-2 mb-4">
                                        <p className="text-xl font-semibold">{proposal.title}</p>

                                        <div className="flex items-center">
                                            <p className="text-gray-400 mr-2">{proposal.options.reduce((a, b) => a + b.votes.length, 0)} votes</p>
                                            <p className="text-gray-400">{proposal.options.length} options</p>
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div className="flex flex-col justify-between w-full px-4">
                                        <p className="text-xl font-semibold">Description</p>

                                        <p className="text-gray-400 overflow-ellipsis">{proposal.description.slice(0, proposal.description.length / 2).trim()}...</p>
                                    </div>

                                    <div className="flex flex-col justify-between w-full px-4">
                                        <div className="flex flex-col justify-between w-full mt-2">
                                            <p className="text-xl font-semibold">Options</p>

                                            {proposal.options.map((option, index) => (
                                                <div className="flex flex-col justify-between w-full" key={index}>
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-lg font-semibold">{option.title}</p>

                                                        <p className="text-gray-400">{option.votes.length} votes</p>
                                                    </div>

                                                    <div className="w-full bg-gray-200 rounded-lg">
                                                        <div className={`h-full max-w-full rounded-lg p-2 ${option.votes.length === Math.max(...proposal.options.map(option => option.votes.length)) ? "bg-gray-700" : "bg-gray-400"
                                                            }`} style={{ width: `${(option.votes.length / proposal.totalVotes) * 100}%` }}>
                                                            <p className="text-white">{((option.votes.length / proposal.totalVotes) * 100).toString().slice(0, 5)}%</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </Layout>
    )
}

export default DAO