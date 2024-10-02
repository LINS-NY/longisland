import * as React from 'react';
import Link from 'next/link'

const MobileForumList = ({data}) => {
    return(
        <div class=" flex flex-col ">
             { data && data.map(function(object, i){
                return(
                   < ForumItem object={object} key={i} />
                )
             }
            )}
        </div>  
    )
}

const ForumItem = ({object}) => {
    const date = object.creationTimeStamp ?new Intl.DateTimeFormat(
        'en-US', { 
               year: 'numeric', 
               month: 'numeric', 
               day: 'numeric', 
        }
    ).format(object.creationTimeStamp.toDate()): ""
    return (
        <Link  href={{
            pathname: `/Forum/${encodeURIComponent(object.id)}`,
            query: {Topic: object.Topic, creator: object.creator}
            }}>
            <div class="border-gray-400 border rounded-lg m-2 shadow-lg md:shadow-2xl  dark:bg-slate-600 shadow-slate-400 ">
            <div class= "p-4 "> 
                <p class="font-serif text-sm text-blue-500 md:text-xl font-medium truncate dark:text-slate-100">
                    {object.Topic}
                </p>
                <p class="text-xs md:px-2 pt-1 font-serif dark:text-slate-100">
                    {object.creator}
                </p>
                
                <div class="flex flex-wrap pt-2 px-2 mt-3" >
                <p class="text-xs tracking-tighter md:text-sm md:font-bold font-medium me-4  dark:text-slate-100">
                    {object.Reply } Replies
                </p>
                    <div class="grow ">

                    </div>
                    <p class="text-xs md:text-sm me-4 font-medium md:font-bold py-1 tracking-tighter dark:text-slate-100">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default MobileForumList