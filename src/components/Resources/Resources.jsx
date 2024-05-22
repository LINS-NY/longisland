import { getAllPostIds, getPostData } from '../../lib/resource';
import Item from './Item'


export default async function Resources(){
    const posts = await getAllPostIds()
    let AllPostData = await Promise.all(posts.map(async (post)=>{
            return (await getPostData(post.params.id))
        }))
    let item = []
    AllPostData.map((i)=> {
       item.push(<Item items={i} key={i.id}/>)
    })
    return(
        <div class="container my-5 sm:my-12 mx-auto px-4 md:px-12">
            <h1 class="text-center text-lg font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Resources</h1>
            <div class="flex flex-wrap -mx-1 lg:-mx-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1">
                    {item}
                </div>
            </div>
        </div>

    )
}

export async function generateStaticParams() {
    const posts = getAllPostIds()
    return posts.map((post) => ({
      id: post.params.id
    }))
  }