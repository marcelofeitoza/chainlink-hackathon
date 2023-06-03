import { Layout } from '@/components/Layout'
import { Feed } from '@/components/Feed';
import { Happening } from '@/components/Happening';
import { Profile } from '@/components/Profile';

const Home = () => {
  return (
    <Layout>
      <div className='flex flex-1 w-full'>
        <Profile />

        <Feed />

        <Happening />
      </div>
    </Layout>
  )
}

export default Home