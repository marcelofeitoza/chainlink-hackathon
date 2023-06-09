import { Layout } from "@/components/Layout"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react"
import flipper from "@/assets/logos/logo-1.svg"
import Image from "next/image";


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

const Proposal = ({ address }: { address: string }) => {
    const router = useRouter();

    const [proposal] = useState({
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

    })

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

                {/* Proposal */}
                <div className="w-full sm:w-1/2 flex flex-col border-x-[1px] border-[#bfbfbf] min-h-screen h-full">
                    {/* Show the proposal */}
                    <div className="flex flex-col w-full px-4 mt-4">
                        <p className="text-3xl font-medium">{proposal.title}</p>

                        <div className="flex flex-col mt-4 w-full">
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <p className="text-sm text-gray-500">Proposed by</p>
                                    <Link href={`/profile/${proposal.proposer.username}`} className="text-lg font-medium">
                                        {proposal.proposer.name ? proposal.proposer.name : proposal.proposer.username}
                                    </Link>
                                </div>

                                <div className="flex flex-col items-center">
                                    <p className="text-sm text-gray-500 mt-4">Created on</p>
                                    <p className="text-lg font-medium">{proposal.createdAt.toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full mt-4">
                                <p className="text-sm text-gray-500">Pull request</p>
                                <Link href={`/pull/${proposal.address}`} className="text-lg font-medium">
                                    {proposal.address}
                                </Link>
                            </div>


                            <div className="flex justify-between items-center mt-4">
                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-500 mt-4">Status</p>

                                    <div className="flex items-center mt-2">
                                        <div className={`w-3 h-3 rounded-full ${proposal.open ? "bg-green-500" : "bg-red-500"}`}></div>
                                        <p className="text-lg font-medium ml-2">{proposal.open ? "Open" : "Closed"}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-500 mt-4">Total votes</p>
                                    <p className="text-lg font-medium ml-2">{proposal.totalVotes}</p>
                                </div>
                            </div>

                            <div className="flex flex-col w-full">
                                <textarea
                                    className="w-full h-40 border-2 border-gray-300 rounded-md p-2 mt-4"
                                    placeholder="Description"
                                    value={proposal.description}
                                    disabled
                                />
                            </div>

                            {/* create a voting sections */}
                            <div className="flex flex-col w-full mt-4">
                                <p className="text-lg font-medium">Voting</p>

                                <div className="flex flex-col w-full mt-4">
                                    {proposal.options.map((option, index) => (
                                        <div onClick={() => alert("You have voted for " + option.title)} className="flex flex-col justify-between w-full hover:cursor-pointer" key={index}>
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
                    </div>

                </div>
            </div>
        </Layout >
    )
}

export default Proposal