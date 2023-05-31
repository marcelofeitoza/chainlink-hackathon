import Image from "next/image"

import profileBackground from "@/assets/images/profile-background.png"
import profileImage from "@/assets/images/profile-icon.png"
import copy from "@/assets/icons/copy.svg"

export const Profile = () => {
    const user = {
        username: "Marcelo Gomes Feitoza",
        address: "0x4417E1d9CA504f92fb882CfC692A33e28C7aCf6d"
    }

    return (
        <div className='w-1/4 flex flex-col items-center'>
            <div className="flex flex-col items-center">
                <Image src={profileBackground} className="w-full" alt="Profile background" />

                <Image src={profileImage} className="rounded-full w-1/4 -mt-16 border-4 border-[#7CB4B8]" alt="Profile image" />
            </div>

            <div className="flex flex-col items-center">
                <p className="text-3xl font-semibold">{user.username}</p>

                <button className="flex justify-center items-center hover:underline" onClick={() => navigator.clipboard.writeText("0x441...Cf6d")}>
                    <Image src={copy} width={16} alt="copy" />
                    <p className="ml-2 text-sm text-[#757575]">
                        {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4, user.address.length)}
                    </p>
                </button>
            </div>

        </div>
    )
}