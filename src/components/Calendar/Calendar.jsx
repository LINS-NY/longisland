'use client';
import { useEffect,useState } from 'react';
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const nepaliDays = ["आईतवार", "सोमवार", "मंगलवार", "बुधवार", "बिहीवार", "शुक्रवार", "शनिवार"];
const NepaliMonths = ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फागुन', 'चैत']
const currentDay= new Date()

const Switch =({nepali,changeNepali}) =>{
    const handleSelect = () => {
        changeNepali(!nepali)
    }
    return(
        <div class="sm:w-5/6 flex flex-row-reverse" >
            <label class="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" class="peer sr-only" value="off" onChange={handleSelect}/>
                <div class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                <label for="switch" class="px-2 ">Nepali</label>
            </label>
        </div>
    )
}

const Today = ({isNepali,currentNepaliDate}) => {
    let month = ""
    let day = ""
    let date = ""
    if (isNepali){
        month = NepaliMonths[currentNepaliDate.split('-')[1] -1]
        day = currentNepaliDate.split('-')[2]
    }else{
        month = months[currentDay.getMonth()]
        day = weekdays[currentDay.getDay()]
        date = currentDay.getDate()
    }
    return (
        <div>
            <h1 class="text-center font-bold text-4xl">Today</h1>
            <div class="flex flex-col container border-2 drop-shadow-2xl border-stone-300 shadow-slate-900 bg-orange-200 w-48 sm:w-96 h-52 md:h-96 mt-2">
                    <div class="text-xl md:text-9xl   shadow-slate-900 bg-orange-300 border-stone-300 ">
                    {month}
                    </div>
                    <div>
                        {day}
                    </div>
                    <div>
                        {date}
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

export default function Calendar(){
    const [ isNepali, setIsNepali ] = useState(false);
    const [currentNepaliDate, setCurrentNepaliDate] = useState("")
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await fetch('https://nepali-datetime.amitgaru.me/date')
            response = await response.json()
            setCurrentNepaliDate(response.data)
          }
          fetchMyAPI()
    },[])
    return(
        <div class="bg-white flex flex-col">
            <div>
            <Switch nepali={isNepali} changeNepali={setIsNepali}/>
            </div>
            <div class="flex flex-row justify-between mx-auto p-4">
                <Today isNepali={isNepali} currentNepaliDate={currentNepaliDate}/>
            </div>
            <div class="flex flex-row justify-between mx-auto p-4">
                <span class="text-sm md:text-3xl font-semibold whitespace-nowrap text-gray-500 dark:text-gray-400">Upcoming Event</span>
            </div>
        </div>
    )
}