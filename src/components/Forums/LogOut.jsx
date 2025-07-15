import * as React from "react";
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseconfig';

const LogOut = () => {
    return (
        <div role="button"
        onClick={() => signOut(auth)}
        className="flex items-center ml-2 md:p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 dark:bg-slate-400 bg-blue-700 ">
        <div className=" md:grid md:mr-4 mr-2 place-items-center hidden text-white dark:text-slate-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            className="w-4 md:w-5 h-4 md:h-5">
            <path fill-rule="evenodd"
                d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                clip-rule="evenodd"></path>
            </svg>
        </div>
        <p className="dark:text-slate-100 p-2 text-xs md:p-0  text-white">Logout</p>
        </div>
    )
}

export default LogOut