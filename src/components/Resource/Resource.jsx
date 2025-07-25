import * as React from 'react';

const Resource = ({item}) => {
    return(
      <div className="flex w-96 sm:w-5/6 mx-auto">
        <div className="flex flex-col justify-center item-center rounded-xl  dark:bg-gray-900 mt-2 sm:mt-5 shadow-2xl shadow-slate-50">
            <div className="mt-1 md:mt-5 md:p-4 p-1 justify-center mx-auto ">
                <h1 className="text-lg md:text-5xl font-semibold whitespace-nowrap text-gray-500  dark:text-white">{item.Title}</h1>
            </div>
            <div className="mx-auto w-5/6 lg:w-2/3 text-center">
                {item.contentRd}
            </div>
        </div>
      </div> 
    )
}

export default Resource