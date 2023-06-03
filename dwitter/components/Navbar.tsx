import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import profile from "@/assets/images/profile-icon.png"
import settings from "@/assets/icons/settings.svg"
import logout from "@/assets/icons/logout.svg"
import { useState } from "react"

const inter = Inter({
    subsets: ['latin'],
})

export const Navbar = ({ links }: {
    links: { name: string, href: string }[]
}) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const toggleOptions = () => {
        setOpen(!open);
    }

    return (
        <div className={`shadow-lg absolute z-50 w-full h-fit items-center justify-between ${inter.className} flex items-center justify-between`}>
            {/* <div className=""> */}
            <div className="flex p-4">
                <Link href="/" className="text-2xl font-semibold">Dwitter</Link>

                <div className="hidden sm:flex items-center ml-8">
                    {links.map((link, i) => (
                        <Link key={i} href={link.href} className={
                            `text-lg cursor-pointer ${i != 0 && "ml-8"} ${router.pathname == link.href ? "text-[#7CB4B8] font-bold" : "font-normal"}`
                        }>{link.name}</Link>
                    ))}
                </div>
            </div>

            <button className="flex items-center h-auto p-4" onClick={toggleOptions}>
                <p className="text-[#757575] mr-2">0x4417...Cf6d</p>
                <Image src={profile} width={32} height={32} alt="profile" className="rounded-full" />
            </button>

            {open && (
                <div className="absolute bg-white fill-white  shadow-md right-0 translate-y-[7.4rem] z-10">
                    <Link href={"/settings"} className="flex items-center px-6 py-4 bg-white hover:bg-slate-100 border-b border-gray-200">
                        <Image src={profile} width={24} height={24} alt="profile" className="mr-2 rounded-full" />
                        <p className="text-[#757575] mr-2">Profile</p>
                    </Link>

                    <Link href={"/settings"} className="flex items-center px-6 py-4 bg-white hover:bg-slate-100 border-b border-gray-200">
                        <Image src={settings} width={24} height={24} alt="profile" className="mr-2 rounded-full" />
                        <p className="text-[#757575] mr-2">Settings</p>
                    </Link>

                    <Link href={"/login"} className="flex items-center px-5 py-4 bg-white hover:bg-slate-100">
                        <Image src={logout} width={24} height={24} alt="profile" className="mr-2 rounded-full" />
                        <p className="text-[#757575] mr-2">Logout</p>
                    </Link>
                </div>
            )}
            {/* </div> */}
        </div>
    )
}