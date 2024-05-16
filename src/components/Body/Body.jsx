import * as React from 'react'; 
import Hero from './Hero'

const Body = () => {
    return(
        <div class=" bg-white flex flex-col">
            <Hero/>
            <div class="max-w-screen-xl flex flex-row justify-between mx-auto p-4">
                <span class="text-sm md:text-lg font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">This is the main Page.</span>
                
            </div>
        </div>
    )
}

export default Body