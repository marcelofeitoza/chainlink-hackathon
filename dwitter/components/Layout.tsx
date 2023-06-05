import { Inter } from "next/font/google"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

interface Props {
    title?: string
    navbar?: boolean
    navbarLinks?: { name: string, href: string }[]
    children: React.ReactNode
}

const navbarLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Profile", href: "/profile" }
];

export const Layout = ({ navbar = true, title, children }: Props) => {
    

    return <>
        <Head>
            <title>
                {title ? `${title} | Dwitter` : "Dwitter"}
            </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={`flex z-0 flex-1 min-w-max text-white w-full min-h-screen h-full bg-[#010f17] ${inter.className} font-sans`}>
            {children}
        </div>
    </>
}   