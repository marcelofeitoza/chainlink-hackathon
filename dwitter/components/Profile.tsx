import Image from "next/image"

import profileBackground from "@/assets/images/profile-background.png"
import profileImage from "@/assets/images/profile-icon.png"
import copy from "@/assets/icons/copy.svg"
import profile from "@/assets/icons/user.svg"
import Link from "next/link"

export const Profile = () => {
    const user = {
        alias: "mfeitoza",
        username: "Marcelo Gomes Feitoza",
        address: "0x4417E1d9CA504f92fb882CfC692A33e28C7aCf6d",
        posts: [
            {}, {}, {}
        ],
        followers: [
            {}, {}, {}, {}, {}
        ],
        following: [
            {}, {}, {}, {}, {}
        ]
    }

    return (
        <div className='hidden sm:w-1/4 sm:flex flex-col items-center absolute left-0 top-0 mt-16'>
            <div className="flex flex-col items-center w-full">
                <Image src={profileBackground} className="w-full" alt="Profile background" />

                <Image src={profileImage} className="rounded-full w-1/4 -mt-16 border-4 border-blue-400" alt="Profile image" />
            </div>

            <div className="flex flex-col items-center">
                <p className="text-3xl font-semibold">{user.username}</p>

                {user.alias && <p className="text-lg font-semibold mb-2">@{user.alias}</p>}

                <button className="flex justify-center items-center hover:underline" onClick={() => navigator.clipboard.writeText(user.address)}>
                    <Image src={copy} width={16} alt="copy" />
                    <p className="ml-2 text-sm text-[#757575]">
                        {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4, user.address.length)}
                    </p>
                </button>

                <Link href={"/profile"} className="flex justify-center items-center bg-blue-400 py-2 px-4 rounded-md w-full my-4">
                    <Image src={profile} alt="user" color={"#fff"} />
                    <p className="ml-2 text-md font-semibold text-white">Go to profile</p>
                </Link>
            </div>

            <div className="w-full flex justify-between">
                <div className="w-1/3 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium">Posts</p>
                    <p className="text-lg">{user.posts.length}</p>
                </div>

                <div className="w-1/3 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium">Followers</p>
                    <p className="text-lg">{user.followers.length}</p>
                </div>

                <div className="w-1/3 flex flex-col justify-center items-center">
                    <p className="text-lg font-medium">Following</p>
                    <p className="text-lg">{user.following.length}</p>
                </div>
            </div>
        </div>
    )
}