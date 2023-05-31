import { Layout } from '@/components/Layout'
import { Feed } from '@/components/Feed';
import { Happening } from '@/components/Happening';
import { Profile } from '@/components/Profile';

export default function Home() {
  const navbarLinks = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Profile", href: "/profile" }
  ];

  return (
    <Layout navbarLinks={navbarLinks}>
      <div className='flex flex-1 w-full'>
        <Profile />

        <Feed />

        <Happening />
      </div>
    </Layout>
  )
}
