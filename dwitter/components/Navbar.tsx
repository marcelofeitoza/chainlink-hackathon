import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({
    subsets: ['latin'],
})

export const Navbar = ({ links }: {
    links: { name: string, href: string }[]
}) => {
    return (
        <div className={`shadow-lg fixed w-full h-fit items-center justify-between px-8 py-4 ${inter.className}`}>
            <div className="flex items-center">
                <Link href="/" className="text-2xl font-semibold">Dwitter</Link>

                <div className="flex items-center ml-8">
                    {links.map((link, i) => (
                        <Link key={i} href={link.href} className={`text-lg font-medium cursor-pointer ${i != 0 && "ml-8"}`}>{link.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    )
}