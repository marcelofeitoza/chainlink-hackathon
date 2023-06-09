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
import { Post } from "@/components/Post"
import { sendFileToIPFS2 } from "@/services/dNftService"
import Compress from "compress.js"


const Perfil = () => {

    const compress = new Compress()

    const [isConnected, setIsConnected] = useState(false)
    const [ address, setAddress ] = useState("")
    const [id, setId ] = useState()
    const [ user, setUser ] = useState()
    const [ file, setFile ] = useState()
    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ hadChanges, setHadChanges ] = useState(false)
    const [ userName, setUserName ] = useState("")
    const [ update, setUpdate ] = useState(false)

    const cookie = new Cookies()

    const router = useRouter();

    async function getUser(id) {
        if(id) {
            console.log("teste")
            try {
                const response = await userService.getUserById(id)
                console.log(response)
                setUser(response.data)
                setAddress(response.data.address)
                setName(response.data.name)
                setEmail(response.data.email)
                setUserName(response.data.username)
            } catch (error) {
                console.log(error)
            }
            return
        } else {
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
    }

    async function resizeImageFn(file) {

        const resizedImage = await compress.compress([file], {
          size: 2, // the max size in MB, defaults to 2MB
          quality: 1, // the quality of the image, max is 1,
          maxWidth: 170, // the max width of the output image, defaults to 1920px
          maxHeight: 170, // the max height of the output image, defaults to 1920px
          resize: true // defaults to true, set false if you do not want to resize the image width and height
        })
        const img = resizedImage[0];
        const base64str = img.data
        const imgExt = img.ext
        const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt)
        return resizedFiile;
    }

    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const files = Array.from(e.target.files)
        console.log("files:", files)

        
        resizeImageFn(files[0]).then((resizedFile) => {
            console.log("resizedFile:", resizedFile)
            setFile(resizedFile)
        })
        //setFile(files[0])
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
        setHadChanges(true)
    }, [file])

    const updateInfos = async () => {
        try {
            const response = await sendFileToIPFS2(file);
            try {
                const res = await userService.updateUser(user.id, {
                    name: name,
                    email: email,
                    username: userName,
                    imgUrl: response
                })
                toast.success("Informações atualizadas com sucesso");
                setTimeout(() => {
                    getUser()
                }, 1000);
            } catch (err) {
                console.log(err)
                toast.error("Erro ao atualizar informações");
            }
        } catch (error) {
            console.log(error)
            toast.error("Erro ao atualizar informações");
        }
    }



    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if(urlParams.get('id')) {
            setId(urlParams.get('id'))
            getUser(urlParams.get('id'))
        } else {
            getUser()
        }
        
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

                            <img src={user.imgUrl} width="170" height="170" className="rounded-full border-4 border-blue-400" alt="Profile image" />
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <p className="text-3xl font-semibold flex flex-row justify-center items-center gap-2">{user.name}{!id &&<div><button onClick={() => {setUpdate(!update)}}><Image src={copy} width={16} alt="copy" /></button></div>}</p>

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
                    {
                        id &&
                        <button onClick={() => {Subscribe()}} className="bg-blue-400 text-white font-semibold text-xl w-2/4 rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                            Follow
                        </button>
                    }
                    

                    {
                        update &&
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

                            <div className="mt-4">
                                <label>
                                    <input onChange={handleFileSelected} accept="image/*" type="file" className="text-sm text-grey-500
                                    file:mr-5 file:py-3 file:px-10
                                    file:rounded-full file:border-0
                                    file:text-md file:font-semibold  file:text-white
                                    file:bg-gradient-to-r file:from-blue-400 file:to-blue-400
                                    hover:file:cursor-pointer hover:file:opacity-80
                                    " />
                                </label>
                            </div>

                            {
                                hadChanges ?
                                <button onClick={() => {updateInfos()}} className="bg-blue-400 text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                    Update
                                </button>
                                :
                                <button disabled className="bg-blue-400 text-white font-semibold text-xl rounded-lg px-4 py-2 justify-center flex items-center p-2 mt-8 w-full">
                                    Update
                                </button>
                            }
                            
                        </div>
                    }
                    <div className="w-full mt-12">
                        {
                            user.posts.sort(
                                (a: any, b: any) => new Date(b.createdAt) - new Date(a.createdAt)
                            ).map(post => {
                                return <Post key={post.id} profile={true} {...post} />
                            })
                        }
                    </div>
                </div>
                }
            </div>
        </Layout>
    )
}

export default Perfil