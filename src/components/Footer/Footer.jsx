import * as React from 'react';
import Link from 'next/link'


const Footer = () => {
    const year = new Date().getFullYear();
    return(

        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-white ">© {year} LINS-NY. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-white sm:mt-0">
                <li>
                    <Link href="/About" className="hover:underline me-4 md:me-6">About</Link>
                </li>
                <li>
                    <Link href="/Contact" className="hover:underline me-4 md:me-6">Contact</Link>
                </li>
            </ul>
            </div>
        </footer>
    )
}

export default Footer