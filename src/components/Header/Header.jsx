import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap xl:flex-row flex-col items-center md:justify-between mx-auto p-4">
                    <div class="hidden sm:flex flex-row justify-between p-4">
                        <Image class="mx-1"
                            src="/LINS.png"
                            width={100}
                            height={100}
                            alt="Lins logo"
                        />
                        <span class="self-center text-lg font-extrabold whitespace-nowrap  text-blue-900 dark:text-white">Long Island Nepalese Society, New York<p>लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क</p></span>
                    </div>
                    <div class="sm:hidden flex p-1">
                        <Image class="mx-1"
                            src="/LINS.png"
                            width={70}
                            height={70}
                            alt="Lins logo"
                        />
                        <span class="self-center text-xs  font-bold whitespace-nowrap dark:text-white text-blue-900">Long Island Nepalese Society, New York<p>लङ्ग आईल्यान्ड नेपाली समाज, न्युयोर्क</p></span>
                    </div>

                    <div class="md:hidden">
                        <ul class="text-sm sm:font-bold sm:text-lg flex flex-row  mt-1 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse    dark:bg-gray-800  dark:border-gray-700">
                            <li>
                                <Link href="/" class="block p-2 sm:p-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white  " aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Resources" class="block p-2 sm:p-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white ">Resources</Link>
                            </li>

                            <li>
                                <Link href="/Donations" class="block p-2 sm:p-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white ">Donation</Link>
                            </li>
                            <li>
                                <Link href="/MembershipForm" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Membership</Link>
                            </li>
                            <li>
                                <Link href="/Calendar" class="block p-2 sm:p-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white ">Calendar</Link>
                            </li>
                        </ul>
                    </div>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="/Donations" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Donation</Link>
                            </li>
                            <li>
                                <Link href="/MembershipForm" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Membership</Link>
                            </li>
                            <li>
                                <Link href="/Resources" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Resources</Link>
                            </li>
                            <li>
                                <Link href="/Calendar" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Calendar</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;





