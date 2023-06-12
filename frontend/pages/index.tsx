import { Layout } from '@/components/Layout'
import { Feed } from '@/components/Feed';
import { Happening } from '@/components/Happening';
import { Profile } from '@/components/Profile';

const Home = () => {
  return (
    <Layout>
      <div className="flex w-full justify-center">
        <Profile />

        <Feed />

        {/* <Happening /> */}
      </div>
    </Layout>
  )
}

export default Home