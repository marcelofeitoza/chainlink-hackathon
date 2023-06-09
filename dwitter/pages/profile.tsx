//@ts-nocheck
import Image from "next/image"
import { Layout } from "@/components/Layout"

import metamask from '@/assets/icons/metamask.svg'
import Link from "next/link"
import { Profile } from "@/components/Profile"

import { verifyConnectToMetamask } from "@/utils/verifyConnectToMetamask"
import { useEffect, useState } from "react"
import userService from "@/services/userService"
import { useRouter } from 'next/navigation';
import toast, { Toaster } from "react-hot-toast"
import Cookies from "universal-cookie"
import profileBackground from "@/assets/images/profile-background.png"
import profileImage from "@/assets/images/profile-icon.png"
import copy from "@/assets/icons/copy.svg"


const Perfil = () => {

    const [isConnected, setIsConnected] = useState(false)
    const [ address, setAddress ] = useState("")
    const [ user, setUser ] = useState()
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ hadChanges, setHadChanges ] = useState(false)
    const [ userName, setUserName ] = useState("")

    const cookie = new Cookies()

    const router = useRouter();

    async function getUser() {
        try {
            const response = await userService.getUser()
            console.log(response)
            setUser(response.data)
            setAddress(response.data.address)
            setName(response.data.name)
            setEmail(response.data.email)
            setUserName(response.data.username)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(user) {
            if(name != user.name || email != user.email || userName != user.username) {
                setHadChanges(true)
            } else {
                setHadChanges(false)
            }
        } 
    }, [name, email, userName])


    useEffect(() => {
        getUser()
    }, [])

    return (
        <Layout title={"Profile"} navbar={true}>
            <Toaster />
            {/* <Profile /> */}
            <div className="flex flex-1 w-full items-center justify-center">
                {/* <Profile /> */}
                {
                user &&
                <div className="w-1/2 flex flex-col mt-8 items-center h-full">
                    <div className='hidden sm:w-3/4 sm:flex flex-col items-center'>
                        <div className="flex flex-col items-center w-full">

                            <img src={user.imgUrl} className="rounded-full w-1/4 border-4 border-blue-400" alt="Profile image" />
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <p className="text-3xl font-semibold">{user.name}</p>

                            {user.username && <p className="text-lg font-semibold mb-2">@{user.username}</p>}

                            <button className="flex  mt-4 mb-4 justify-center items-center hover:underline" onClick={() => navigator.clipboard.writeText(user.address)}>
                                <Image src={copy} width={16} alt="copy" />
                                <p className="ml-2 text-sm text-[#757575]">
                                    {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4, user.address.length)}
                                </p>
                            </button>
                        </div>

                        <div className="w-full flex justify-between">
                            <div className="w-1/3 flex flex-col justify-center items-center">
                                <p className="text-lg font-medium">Posts</p>
                                <p className="text-lg">{user.posts.length}</p>
                            </div>

                            <div className="w-1/3 flex flex-col justify-center items-center">
                                <p className="text-lg font-medium">Followers</p>
                                <p className="text-lg">10</p>
                            </div>

                            <div className="w-1/3 flex flex-col justify-center items-center">
                                <p className="text-lg font-medium">Following</p>
                                <p className="text-lg">10</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="mt-4 mb-4">
                            <p className="text-2xl text-blue-400">Name</p>
                            <input defaultValue={user.name} onChange={event => setName(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 py-2 placeholder:text-blue-400 focus:border-blue-500" type="text" placeholder="Full Name" />
                        </div>

                        <div className="mt-4 mb-4">
                            <p className="text-2xl text-blue-400">Email</p>
                            <input defaultValue={user.email} onChange={event => setEmail(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 py-2 placeholder:text-blue-400 focus:border-blue-500" type="text" placeholder="Email" />
                        </div>

                        <div className="mt-4 mb-4">
                            <p className="text-2xl text-blue-400">Email</p>
                            <input defaultValue={user.username} onChange={event => setUserName(event.target.value)} className="border-2 border-blue-400 rounded-lg w-full px-4 py-2 placeholder:text-blue-400 focus:border-blue-500" type="text" placeholder="Email" />
                        </div>

                        {
                            hadChanges ?
                            <button className="bg-blue-400 text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                Update
                            </button>
                            :
                            <button disabled className="bg-blue-400 text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                Update
                            </button>
                        }
                        
                    </div>
                    <div>

                    </div>
                </div>
                }
            </div>
        </Layout>
    )
}

export default Perfil