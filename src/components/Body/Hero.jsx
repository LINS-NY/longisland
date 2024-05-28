import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero =()=>{
   return(
    <div>
        <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('./Designer.jpeg')`}}>
        <div class="relative flex justify-between m-2  h-full mx-auto backdrop-blur-md bg-white/60 dark:bg-slate-700/60">
            <div class="flex justify-center font-bold">
                <div class="flex flex-col text-center mx-5 justify-center item-center">
                    <h1 class="sm:max-w-2xl mb-2 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                    Long Island Nepalese Society
                    </h1>
                    <p class="mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white"> New York</p>
                    <p class=" mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                    लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                    </p>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    To Serve, Unite and move toward progress
                    </p>
                </div>
            </div>
            </div>
        </section>
        <section class="hidden sm:flex relative container rounded-xl mx-auto  my-5 sm:my-10 sm:w-3/5 w-5/6 sm:h-64 h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 ">
        <div class="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
            <div class="flex justify-center ">
                <div class="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                    <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    Long Island Nepalese Society, New York
                    </h1>
                    <p class="sm:max-w-2xl mb-4 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                    लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                    </p>
                    <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white xl:text-xl font-bold">
                    From Planning To Progress
                    </p>
                    <br/>
                    <div class="space-x-2">
                        <Link href="/FinancialReport">
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 border-b-4 
                                    border-blue-700 hover:border-blue-500 rounded">Financial Report</button>
                        </Link>
                        <Link href="/About">
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 border-b-4 
                                    border-blue-700 hover:border-blue-500 rounded">Membership Form</button>
                        </Link>
                        <Link href="/About">
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-3 border-b-4 
                                    border-blue-700 hover:border-blue-500 rounded">Donation Form</button>
                        </Link>
                    </div>
                </div>
                
                



            </div>
            <div class=" hidden sm:flex sm:mx-5 justify-center">
                <div class="flex flex-col justify-center">
                    <Image 
                        src="/LINS.png"
                        width={200}
                        height={200}
                        alt="Lins logo"
                        />
                </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default Hero