import { googleDocsGet, getAllResourcesID } from '../../lib/resource';
import Item from './Item'


export default async function Resources() {
    const id = await getAllResourcesID('1Z3iLf79gKWsyFVqEh1xAyUUuz4gRAozI')
    let docsData = await Promise.all(id.map(async (document) => {
        return (await googleDocsGet(document.params.documentId))
    }))
    let item = []
    docsData.map((i) => {
        item.push(<Item items={i} key={i.id} />)
    })
    return (
        <div class="container my-5 sm:my-12 mx-auto px-4 md:px-12">

            {/* Comment Box */}
            <h1 class="text-center text-lg py-4 lg:text-5xl lg:py-10 font-bold whitespace-nowrap 
            text-gray-500 dark:text-gray-400">User Discussion Section</h1>
            
            <div class="bg-gray-100 p-6">
                <h2 class="text-lg font-bold mb-4">Comment</h2>
                <div class="flex flex-col space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg font-bold">Deepak Adhikari</h3>
                        <p class="text-gray-700 text-sm mb-2">Posted on April 17, 2024</p>
                        {/* <input type="datetime-local" name="date"></input> */}
                        <p class="text-gray-700">This is a sample comment.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg font-bold">Bijendra Basnet</h3>
                        <p class="text-gray-700 text-sm mb-2">Posted on April 16, 2024</p>
                        <p class="text-gray-700">I agree with John.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg font-bold">Bikash Mainali</h3>
                        <p class="text-gray-700 text-sm mb-2">Posted on April 15, 2024</p>
                        <p class="text-gray-700">I have a different opinion.</p>
                    </div>
                    <form class="bg-white p-4 rounded-lg shadow-md">
                        <h3 class="text-lg font-bold mb-2">Add a comment</h3>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">
                                Name
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" placeholder="Enter your name" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="comment">
                                Comment
                            </label>
                            <textarea
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
                                focus:outline-none focus:shadow-outline"
                                id="comment" rows="3" placeholder="Enter your comment"></textarea>
                        </div>
                        <button
                            class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none 
                            focus:shadow-outline"
                            type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Resources */}
            <h1 class="text-center text-lg py-4 lg:text-5xl lg:py-10 font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Resources</h1>
            <div class="flex flex-wrap -mx-1 lg:-mx-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-1 ">
                    {item}
                </div>
            </div>
        </div>
    )
}