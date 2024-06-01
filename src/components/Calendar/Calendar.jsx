import * as React from 'react';
import Image from 'next/image'
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const currentDay= new Date()

const Today = () => {
    return (
        <div>
            <h1 class="text-center font-bold text-4xl">Today</h1>
            <div class="flex flex-col container border-2 drop-shadow-2xl border-stone-300 shadow-slate-900 bg-orange-200 w-48 sm:w-96 h-52 md:h-96 mt-2">
                    <div class="text-xl md:text-9xl   shadow-slate-900 bg-orange-300 border-stone-300 ">
                    {months[currentDay.getMonth()]}
                    </div>
                    <div>
                        {weekdays[currentDay.getDay()]}
                    </div>
                    <div>
                        {currentDay.getDate()}
                    </div>
            </div>
        </div>
    )
}

const CalendarDisplay = () => {
   
   
   console.log(currentDay.getDay())
    return (
        <div>
            <h1>calendar</h1>
        </div>
    )
}

const Calendar = () => {
    return(
        <div class="bg-white flex flex-col">
            <div class="flex flex-row justify-between mx-auto p-4">
                <Today/>
            </div>
            <div class="flex flex-row justify-between mx-auto p-4">
                <span class="text-sm md:text-3xl font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">Upcoming Event</span>
            </div>
        </div>
    )
}

export default Calendar