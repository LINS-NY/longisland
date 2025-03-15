import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
    return (
        <div>
            <section class="sm:hidden relative container rounded-xl mx-auto  my-5  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('./Designer.jpeg')` }}>
                <div class="relative flex justify-between m-2 rounded-xl  h-full mx-auto backdrop-blur-md bg-white/60 dark:bg-slate-700/60">
                    <div class="flex flex-grow justify-center font-bold">
                        <div class="flex flex-col text-center mx-5 justify-center item-center">
                            <h1 class="sm:max-w-2xl mb-2 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                                Long Island Nepalese Society
                            </h1>
                            <p class="mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white"> New York</p>
                            <p class=" mb-4 text-md tracking-tight leading-none text-blue-900  dark:text-white">
                                लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                            </p>
                            <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                                From Planning To Progress
                            </p>
                            
                            
                            <div class="flex  flex-wrap text-sm font-light item-center justify-center">
                                 <Link href="/FinancialReport" >
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">
                                        Financial Report
                                    </button> 
                                </Link>
                                <Link href="/News">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                                </Link>
                                <Link href="/Forums">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  
                            dark:shadow-slate-950 shadow-lg rounded-lg p-2 dark:text-white text-white m-2 
                            drop-shadow-2xl">Forum</button>
                                </Link>
                                <Link href="/GalleryYearSelection">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">Gallery</button>
                                </Link>
                                <Link href="/Bylaws">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700 dark:text-white 
                            dark:shadow-slate-950   shadow-lg rounded-lg p-2 text-white m-2 drop-shadow-2xl">Bylaws</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section class="hidden sm:flex relative container sm:h-80 rounded-xl mx-auto  my-5 sm:my-10  w-5/6  h-96 shadow-sm dark:bg-gray-900 bg-gradient-to-r from-purple-500 to-red-500 dark:from-slate-500 dark:to-slate-900">
                <div class="relative flex justify-between m-2 sm:w-5/6 h-full mx-auto">
                    <div class="flex justify-center ">
                        <div class="flex flex-col sm:mx-15 mx-4 justify-center item-center">
                            <h1 class=" mb-2 text-md md:text-2xl sm:font-extrabold tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                                Long Island Nepalese Society, New York
                            </h1>
                            <p class="sm:max-w-2xl mb-4 text-md md:text-2xl sm:font-extrabold tracking-tight 
                    leading-none text-blue-900 xl:text-2xl dark:text-white">
                                लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                            </p>
                            <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-white xl:text-xl font-bold">
                                From Planning To Progress
                            </p>
                            <div class="flex flex-wrap item-center justify-center max-[800px]:text-sm ">
                                <Link href="/FinancialReport">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Financial Report</button>
                                </Link> 
                                <Link href="/News">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">LINS News</button>
                                </Link>
                                <Link href="/Forums">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950   
                            shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Forum</button>
                                </Link>
                                <Link href="/GalleryYearSelection">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Gallery</button>
                                </Link>
                                <Link href="/Bylaws">
                                    <button class="bg-cyan-500 dark:bg-slate-800 shadow-gray-700  dark:shadow-slate-950  
                             shadow-lg dark:text-white rounded-lg p-2 text-white m-2 drop-shadow-2xl">Bylaws</button>
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

            {/* President's Messages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container mx-auto my-10 w-5/6">
                {/* President's Message */}
                <Link href="/PresidentialMessages">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        <div className="p-6">
                            <div className="flex justify-center">
                                <Image
                                    src="/RajanGouli.jpg"
                                    width={120}
                                    height={120}
                                    alt="Rajan Gouli"
                                    className="rounded-full"
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-blue-900 dark:text-white text-center mt-4">
                                President's Message
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2">
                                Dear Valuable and Respected Members of the Long-island Nepalese Society New York...
                            </p>
                        </div>
                    </div>
                </Link>


                  {/* Gen. Secretary's Message */}
                <Link href="/GeneralSecretaryMessages">
                    <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer border border-white/10 dark:border-gray-700/10">
                        <div className="p-6 text-center">
                            <div className="flex justify-center">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg">
                                    <Image
                                        src="/RajendraKarki.jpg"
                                        width={120}
                                        height={120}
                                        alt="Rajendra Karki"
                                        className="rounded-full border-4 border-white dark:border-gray-800"
                                    />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400 mt-4">
                                Gen. Sec's Message
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Dear Valuable and Respected Members of the Long-island Nepalese Society New York...
                            </p>
                        </div>
                    </div>
                </Link>
                
            </div>

        </div>

    )
}

export default Hero