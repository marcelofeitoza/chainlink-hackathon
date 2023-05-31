import Image from "next/image"
import { Layout } from "@/components/Layout"

import metamask from '@/assets/icons/metamask.svg'
import Link from "next/link"

const Login = () => {
    return (
        <Layout title={"Login"} navbar={false}>
            <div className="flex flex-1">
                <div className="bg-[#7CB4B8] w-1/2 flex flex-col flex-1 items-center justify-center h-full">
                    <div className="mb-8 flex flex-col items-center">
                        <p className="text-7xl font-semibold text-white text-center mb-4">Welcome to<br />Dwitter</p>

                        <p className="text-xl text-white font-medium text-center">Share, donate, create</p>
                    </div>

                    <Image width={256} alt="Metamask" src={metamask} />
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center h-full">
                    <p className="text-4xl font-medium mb-16">Log into your account</p>

                    <div className="w-full md:w-2/5 flex flex-col items-center">
                        <button className="border-2 border-[#7CB4B8] text-[#7CB4B8] font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 w-full">
                            <Image src={metamask} width={32} alt="login" className="mr-2" />Login with Metamask
                        </button>

                        <div className="flex w-full items-center my-8">
                            <div className="h-0.5 w-full border-t-0 bg-[#7CB4B8] opacity-50"></div>

                            <p className="text-[#7CB4B8] mx-2">or</p>

                            <div className="h-0.5 w-full border-t-0 bg-[#7CB4B8] opacity-50"></div>
                        </div>

                        <div className="w-full">
                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Email</p>
                                <input className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 placeholder:text-[#7cb4b8] focus:border-blue-500 py-2" type="text" placeholder="email@email.com" />
                            </div>

                            <div>
                                <p className="text-2xl text-[#7cb4b8]">Password</p>
                                <input className="border-2 border-[#7cb4b8] rounded-lg w-full px-4 py-2 placeholder:text-[#7cb4b8] focus:border-blue-500" type="password" placeholder="********" />
                            </div>

                            <button className="bg-[#7CB4B8] text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                Login
                            </button>

                            <div className="w-full flex justify-end">
                                <Link href="/signup" className="text-[#7CB4B8] text-sm underline text-end">I don't have an account</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Login