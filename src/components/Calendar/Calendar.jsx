import * as React from 'react';
import Image from 'next/image'

const Calendar = () => {
    return(
        <div class="h-svh  bg-white flex flex-col">
            <div class="max-w-screen-xl flex flex-row justify-between mx-auto p-4">
                <span class="text-sm md:text-3xl font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">Calendar for our activity</span>
            </div>
            <div class="max-w-screen-xl flex flex-row justify-between mx-auto p-4">
                <span class="text-sm md:text-3xl font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">Upcoming Event</span>
            </div>
            <div class="max-w-screen-xl flex flex-row justify-between mx-auto p-4">
                <Image class="mx-1 px-5"
            src="/new_year.jpg"
            width={1000}
            height={1000}
            alt="Lins logo"
            />
            </div>
        </div>
    )
}

export default Calendar