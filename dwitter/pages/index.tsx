import { Layout } from '@/components/Layout'
import { Feed } from '@/components/Feed';
import { Happening } from '@/components/Happening';
import { SideBar } from '@/components/SideBar';

const Home = () => {
  return (
    <Layout>
      <div className='flex flex-1 w-full'>
        <SideBar />

        <Feed />

        <Happening />
      </div>
    </Layout>
  )
}

export default Home