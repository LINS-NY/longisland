import {  getFinancialDocs,  getAllFinances } from '../../lib/resource';
import Item from './Item'


export default async function FinancialReports(){
    const id = await getAllFinances('16sIVBJl6hsLA-_27vWvvF9CxGsfcRdeq')
    let docsData = await Promise.all(id.map(async (document)=>{
        return (await getFinancialDocs(document.params.documentId))
    }))
    let item = []
    docsData.map((i)=> {
       item.push(<Item title={i.title} location={i.location} key={i.location}/>)
    })
    return(
        <div class="container my-5 sm:my-12 mx-auto px-4 md:px-12">
            <h1 class="text-center text-lg py-4 lg:text-5xl lg:py-10 font-bold whitespace-nowrap text-gray-500 dark:text-gray-400">Reports</h1>
            <div class="flex flex-wrap -mx-1 lg:-mx-4 justify-center">
                <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 px-1 ">
                    {item}
                </div>
            </div>
        </div>
    )
}