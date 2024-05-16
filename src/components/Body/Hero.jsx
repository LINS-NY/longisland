import * as React from 'react';
import Image from 'next/image'

const Hero =()=>{
   return(
    <section class="container rounded-xl mx-auto  w-5/6 h-64 shadow-sm bg-gradient-to-r from-purple-500 to-red-500">
       <div class="flex justify-between m-2 h-full">
        <div class="flex justify-center">
            <div class="flex flex-col sm:mx-10 justify-center">
                <h1 class="max-w-2xl mb-2 text-lg md:text-2xl font-extrabold tracking-tight leading-none  text-blue-900 xl:text-3xl dark:text-white">
                Long Island Nepalese Society, New York
                </h1>
                <p class="max-w-2xl mb-4 text-lg md:text-2xl font-extrabold tracking-tight leading-none text-blue-900 xl:text-3xl dark:text-white">
                लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क
                </p>
                <p class="max-w-2xl mb-4 text-sm fond-sm tracking-tight leading-none text-blue-900 xl:text-2xl dark:text-white">
                To Serve, Unite and move toward progress
                </p>
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
    )
}

export default Hero