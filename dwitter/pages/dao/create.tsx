import { Layout } from "@/components/Layout"
import Link from "next/link";
import { useRouter } from "next/router"
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

const DAO = () => {
    const router = useRouter();

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

                {/* Create proposal */}
                <div className="w-full sm:w-1/2 flex flex-col border-x-[1px] border-[#bfbfbf] min-h-screen h-full">
                    <div className="flex flex-col items-center py-8 px-4">
                        <p className="text-2xl font-medium">Create Proposal</p>

                        <div className="flex flex-col items-center w-full mt-4">
                            <div className="flex flex-col w-full">
                                <label className="text-sm font-medium">Title</label>
                                <input type="text" className="border-2 border-gray-300 rounded-md px-2 py-1 mt-2" placeholder="Proposal title" />

                                <label className="text-sm font-medium mt-4">Pull request URL</label>
                                <input type="text" className="border-2 border-gray-300 rounded-md px-2 py-1 mt-2" placeholder="https://github.com/flipper-dao/flipper/pull/1"
                                />

                                <label className="text-sm font-medium mt-4">Description</label>
                                <textarea className="border-2 border-gray-300 rounded-md px-2 py-1 mt-2" placeholder="Proposal description" rows={6} />

                                <div className="flex flex-col w-full mt-4 items-end">
                                    <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default DAO