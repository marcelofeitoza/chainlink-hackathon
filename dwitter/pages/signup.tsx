import Image from "next/image"
import { Layout } from "@/components/Layout"

import metamask from '@/assets/icons/metamask.svg'
import Link from "next/link"

import { verifyConnectToMetamask } from "@/utils/verifyConnectToMetamask"
import  Cookies  from "universal-cookie"
import { useEffect, useState } from "react"
import userService from "@/services/userService"
import { useRouter } from 'next/navigation';

import toast, { Toaster } from "react-hot-toast"

const SignUp = () => {

    const [ address, setAddress ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ name, setName ] = useState("")
    const [ userName, setUserName ] = useState("")
    const [ password1, setPassword1 ] = useState("")

    const router = useRouter();

    const cookie = new Cookies()

    async function Subscribe() {

        if (password != password1) {
            toast.error("Passwords don't match")
            return
        }

        try {
            const response = await userService.register(address, password, name, email, userName)
            toast.success("User created successfully")
            try {
                const response = await userService.auth(address, password)
                cookie.set("token", response.data.access_token)
                setTimeout(() => {
                    router.push("/")
                }, 2000)
            } catch (err) {
                console.log(err)
                toast.error("Invalid credentials")
            }
        } catch (err) {
            console.log(err)
            toast.error("Invalid infos")
        }
    }  
    
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setAddress(urlParams.get('address'))
    }, [])

    return (
        <Layout title={"Login"} navbar={false}>
            <Toaster />
            <div className="flex flex-1">
                <div className="bg-blue-400 w-1/2 flex flex-col flex-1 items-center justify-center h-full">
                    <div className="mb-8 flex flex-col items-center">
                        <p className="text-7xl font-semibold text-white text-center mb-4">Welcome to<br />Flipper</p>

                        <p className="text-xl text-white font-medium text-center">Share, donate, create</p>
                    </div>

                    <Image width={256} alt="Metamask" src={metamask} />
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center h-full">
                    <p className="text-4xl font-medium mb-16">Sign Up into Flipper</p>

                    <div className="w-full md:w-2/5 flex flex-col items-center">
                        <div className="w-full">

                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Address</p>
                                <input className="border-2 border-blue-400 rounded-lg w-full px-4 placeholder:text-blue-400 focus:border-blue-500 py-2 text-blue-400" disabled value={address} type="text" placeholder="email@email.com" />
                            </div>
                            
                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Email</p>
                                <input onChange={event => setEmail(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 placeholder:text-blue-400 focus:border-blue-500 py-2" type="text" placeholder="email@email.com" />
                            </div>

                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Name</p>
                                <input onChange={event => setName(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 placeholder:text-blue-400 focus:border-blue-500 py-2" type="text" placeholder="Full Name" />
                            </div>

                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Username</p>
                                <input onChange={event => setUserName(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 placeholder:text-blue-400 focus:border-blue-500 py-2" type="text" placeholder="Username" />
                            </div>

                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Password</p>
                                <input onChange={event => setPassword(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 py-2 placeholder:text-blue-400 focus:border-blue-500" type="password" placeholder="********" />
                            </div>

                            <div className="mb-2">
                                <p className="text-xl font-medium text-blue-400">Confirm Password</p>
                                <input onChange={event => setPassword1(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 py-2 placeholder:text-blue-400 focus:border-blue-500" type="password" placeholder="********" />
                            </div>

                            {/* <div className="mt-4">
                                <label>
                                    <input type="file" className="text-sm text-grey-500
                                    file:mr-5 file:py-3 file:px-10
                                    file:rounded-full file:border-0
                                    file:text-md file:font-semibold  file:text-white
                                    file:bg-gradient-to-r file:from-blue-400 file:to-blue-400
                                    hover:file:cursor-pointer hover:file:opacity-80
                                    " />
                                </label>
                            </div> */}

                            <button onClick={() => {Subscribe()}} className="bg-blue-400 text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                SignUp
                            </button>

                            {/* <div className="w-full flex justify-end">
                                <Link href="/signup" className="text-blue-400 text-sm underline text-end">I don't have an account</Link>
                            </div> */}
                        </div>
                        
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default SignUp