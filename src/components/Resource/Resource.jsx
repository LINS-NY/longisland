import * as React from 'react';

const Resource = ({item}) => {
    return(
      <div class="flex flex-col">
        <div class="py-2 justify-center mx-auto">
            <h1 class="text-sm md:text-lg font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">{item.Title}</h1>
        </div>
        <div class="py-2 justify-center mx-auto w-5/6 lg:w-2/3">
            {item.contentRd}
        </div>
      </div> 
    )
}

export default Resource