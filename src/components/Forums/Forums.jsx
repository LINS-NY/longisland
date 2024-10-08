'use client'
import * as React from 'react';
import { useState } from 'react'
import Login from "./Login"
import LogOut from "./LogOut"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../firebaseconfig';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection,addDoc,serverTimestamp,query,orderBy } from 'firebase/firestore';
import  MobileForumList  from './MobileForumList'
import Avatar from './Avatar';

const Forums = () => {
    const [openModel,setOpenModel] = useState(false)
    const [input,setInput] = useState("")
    const [user] = useAuthState(auth);
    const q = query(collection(db,"Forum"),orderBy("creationTimeStamp", "desc"))
    const [snapshot] = useCollection(q);
    const data = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}))
    const createTopic = async (e) => {
        e.preventDefault()
        await addDoc(collection(db,"Forum"), {
            Topic: input,
            Reply: 0,
            creator: user.email,
            creationTimeStamp: serverTimestamp(),
        })
        setInput("");
        setOpenModel(!openModel)
    }
    return(
        <div class="">
            <div className={`flex flex-col item-center justify-center ${openModel ? "blur-2xl": "display"} bg-white/30`}>
                <div class="flex flex-row justify-between">
                    <h1 class="p-2 font-bold font-serif tracking-wide md:text-3xl text-xl text-blue-400 ">Forum</h1>
                    <div class="flex flex-row items-center justify-center px-2">
                    { 
                        user &&
                        <div> 
                            <button class="block text-white dark:bg-slate-400 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 md:px-5 md:py-2.5 text-center  dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                             onClick={() => setOpenModel(!openModel)}
                             >
                                Create
                            </button>
                        </div>
                    }
                    { user && <LogOut/> }
                    { user && <Avatar name={user.displayName}/> }
                    { !user && <Login/> }
                    </div>
                </div>
                <div class="">
                < MobileForumList data={data} />
                </div>
            </div>
                {
                   openModel && <NewCreate createTopic={createTopic} setInput={setInput} input={input}/>
                }
        </div>
    )
}

const NewCreate = ({createTopic,setInput,input}) => {
    return (
        <div id="Topic-modal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden absolute inset-0 h-screen flex justify-center items-center w-full md:inset-0  max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Create a Topic for Discussion
                        </h3>
                        <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div class="p-4 md:p-5">
                        <form class="space-y-4" action="#">
                            <div>
                                <label for="topic" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Topic</label>
                                <input type="topic" name="topic" id="topic" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Post a thread" required 
                                onChange ={e => setInput(e.target.value)}
                                value={input}/>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={e => createTopic(e)}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default Forums