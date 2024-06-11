

import Header from '@/components/Header/Header';
import Resource from '@/components/Resource/Resource';
import Footer from '@/components/Footer/Footer';
import { getAllPostIds, getPostData } from '../../../lib/resource';

export default async function Post({params}) {
  const data = await getPosts(params.id)
  return (
    <main class="flex flex-col h-dvh relative">
    <Header/>
    <Resource class="dark:text-dark" key={data.postData.id} item={data.postData}/>
    <Footer/>
  </main>
  )
}

async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts.map((post) => ({
    id: post.params.id
  }))
}

async function getPosts(id) {
  const postData = await getPostData(id);
  return {
      postData,
    };
}