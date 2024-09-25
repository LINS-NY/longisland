'use client'
import * as React from 'react';
import Login from "./Login"
import LogOut from "./LogOut"
import ForumList from './ForumList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebaseconfig';
import Avatar from './Avatar';

const Forums = () => {
    const [user, loading, error] = useAuthState(auth);

    return(
        <div class="w-96 lg:w-3/5 sm:w-5/6 mx-auto bg-gray-100 rounded border dark:bg-gray-900 p-5 my-10 rounded-lg">
            <div class="flex flex-col">
                <div class="flex flex-row justify-between w-full">
                    <h1 class="font-normal tracking-wide text-3xl">Forum</h1>
                    <div class="flex flex-row">
                    { user && <LogOut/> }
                    { user && <Avatar name={user.displayName}/> }
                    { !user && <Login/> }
                    </div>
                </div>
                <div class="flex flex-row justify-between w-full p-2">
                    <div>
                        <p class="text-xl">
                            Board
                        </p>
                        
                    </div>
                    <div class="px-3">
                    { user && <button class="bg-indigo-600 dark:bg-gray-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>}
                    </div>
                </div>
                <ForumList/>
            </div>
        </div>
    )
}

export default Forums