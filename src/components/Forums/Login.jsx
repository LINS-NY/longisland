import * as React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseconfig";

const LogIn = () => {
<<<<<<< HEAD
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <div
      role="button"
      onClick={() => signInWithGoogle()}
      class="flex items-center p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 dark:text-slate-800 dark:bg-slate-400 bg-blue-400"
    >
      <div class="lg:grid mr-4 md:mr-2 place-items-center hidden dark:text-slate-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          class="w-5 sm:w-1 sm:h-1 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      Login
    </div>
  );
};
=======
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    return (
        <div role="button"
        onClick={() => signInWithGoogle()}
        class="flex items-center p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 dark:text-slate-800 dark:bg-slate-400 bg-blue-400">
        <div class="lg:grid mr-4 md:mr-2 place-items-center hidden dark:text-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
            class="w-5 sm:w-1 sm:h-1 h-5">
            <path fill-rule="evenodd"
                d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                clip-rule="evenodd"></path>
            </svg>
        </div>
        Login
        </div>
    )
}
>>>>>>> 522054bcf140500783ae5dcd660bff7767e580fd

export default LogIn;
