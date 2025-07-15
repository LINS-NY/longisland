'use client'
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../../../firebaseconfig';
import {  useCollectionData } from 'react-firebase-hooks/firestore';
import { addDoc, collection,orderBy,query, serverTimestamp, updateDoc,doc, increment } from 'firebase/firestore';
import { useParams,useSearchParams } from 'next/navigation'

const Forums = () => {
    const [input,setInput] = useState("")
    const [user] = useAuthState(auth);
    const id = useParams()
    const searchParams = useSearchParams()
    const search = searchParams.get('Topic')
    const creator = searchParams.get('creator')
    const q = query(collection(db,`Forum/${id.id}/messages`),orderBy("timestamp"))
    const [message] = useCollectionData(q)
    const bottomOfRef = useRef()
    const ForumRef = doc(db, "Forum",id.id);
    const sendMessage = async (e) => {
        e.preventDefault()
        await addDoc(collection(db,`Forum/${id.id}/messages`), {
            text: input,
            name: user.displayName,
            sender: user.email,
            timestamp: serverTimestamp(),
        })
        await updateDoc(ForumRef,{
            Reply: increment(1)
        })
        setInput("");
    }

    useEffect(() => 
            bottomOfRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            }),
        [message])
    return(
        <div>
            {
                message && 
                <div id="chat-container" className="w-11/12 md:w-7/12 m-4 item-center justify-center mx-auto  bg-gray-100 border dark:bg-gray-900 rounded-lg">
                        <div className="p-4 border-b text-dark rounded-t-lg flex flex-col">
                            <p className="text-lg font-semibold">{search}</p>
                            <p className="text-xs px-2">{creator}</p>
                        </div>
                        
                        <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                            {
                                message.map(function(object, i){
                                    return(
                                        <Individual object={object} key={i}/>
                                    )
                                })
                            }
                            <div ref={bottomOfRef}></div>
                        </div>
                        <div className="p-4 border-t flex">
                            <input 
                                id="user-input" 
                                type="text" 
                                placeholder="Type a message" 
                                className="w-full px-3 py-2 border dark:text-black rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange ={e => setInput(e.target.value)}
                                value={input}/>
                            {user ? <button 
                                id="send-button" 
                                className={`bg-blue-500 text-white  px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 ${ user ? "test" : "cursor-not-allowed opacity-50" }`}
                                onClick={e => sendMessage(e)}
                                >
                                    Send
                            </button>:
                            <div className={`bg-blue-500 text-white  px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300 ${ user ? "test" : "cursor-not-allowed opacity-50" }`}> send</div>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}



const Individual = ({object}) => {
    const date = object.timestamp ? new Intl.DateTimeFormat(
        'en-US', { 
               year: 'numeric', 
               month: 'numeric', 
               day: 'numeric', 
        }
    ).format(object?.timestamp.toDate()): ""
    return (
        <div className="mb-2">
        <div className="flex flex-row">
        <p className="md:text-lg text-sm font-bold">{object.sender}</p>
        <p className="text-xs font-semibold px-4 p-1">{date}</p>
        </div>
        <div className="p-2 rounded-lg bg-slate-200">
        <p className= "text-gray-700 rounded-lg py-2 px-4 inline-block font-bold">{object.text}</p>
        </div>
    </div>
    )
}

export default Forums