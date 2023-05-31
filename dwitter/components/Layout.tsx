import { Inter } from "next/font/google"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { Navbar } from "@/Navbar"

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

export const Layout = ({ navbar = true, navbarLinks = [{ name: "", href: "/" }], title, children }: Props) => {
    return <>
        <Head>
            <title>
                {title ? `${title} | Dwitter` : "Dwitter"}
            </title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {navbar && <Navbar links={navbarLinks} />}
        <div className={`flex flex-1 min-w-max w-full min-h-screen h-full bg-[#fff] ${inter.className} font-sans ${navbar ? "pt-16" : ""}`}>
            {/* <div className={`${navbar ? "mt-16" : ""} w-full`}> */}
            {children}
            {/* </div> */}
        </div>
    </>
}   