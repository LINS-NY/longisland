import * as React from 'react';

const FinancialReport = ({title,content,heading}) => {
    console.log(title,content,heading)
    const contTable = []
    const headItem = 
        <tr class="rounded-3xl">   
            <th scope="col" class=" font-bold md:px-6 px-1 py-1 md:py-4">{heading[0]}</th>
            <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">{heading[1]}</th>
            <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">{heading[2]}</th>
            <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">{heading[3]}</th>
            <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">{heading[4]}</th>
        </tr>

   content.map((val) => {
        contTable.push(
        <tr class="border-b border-neutral-00 bg-black/[0.02] dark:border-white/10 hover:bg-cyan-200">
            <td class="capitalize text-black lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-medium">{val[0]}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">{val[1]}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">{val[2]}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">{val[3]}</td>
            <td class="lg:whitespace-nowrap text-black lg:px-6 px-1 lg:py-4 py-1 font-medium">{val[4]}</td>
        </tr>
        )
    })  
    console.log(contTable)
    return(
        <div class=" bg-white flex flex-row w-96 sm:w-5/6">
            <div class="p-4">
                <h1 class="text-lg sm:text-xl font-semibold whitespace-nowrap text-gray-500 mx-auto text-center dark:text-gray-400">
                    {title}
                </h1>
                <div class="mt-5 sm:mt-20 shadow-lg shadow-cyan-500/50 ">
                    <div class="overflow-hidden ">
                        <table class="w-full text-center text-sm font-light dark:text-white border-collapse ">
                            <thead class="shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 bg-sky-500/100 rounded-3xl">                                    
                                {headItem}
                            </thead>
                            <tbody> 
                                {contTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default FinancialReport