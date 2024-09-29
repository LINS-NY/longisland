import * as React from 'react';
import Link from 'next/link'

const MobileForumList = ({data}) => {
    return(
        <div class="bg-gray-200 flex flex-col">
             { data && data.map(function(object, i){
                return(
                   < ForumItem object={object} />
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
            query: {Topic: object.Topic}
            }}>
            <div class="border-gray-400 border rounded-lg m-2">
            <div class= "p-4 "> 
                <p class="font-serif text-blue-500 md:text-xl font-medium truncate dark:text-black">
                    {object.Topic}
                </p>
                <p class="text-sm px-2 pt-1  dark:text-black">
                    {object.creator}
                </p>
                
                <div class="flex flex-wrap pt-2 px-2 mt-3" >
                <p class="text-sm font-bold me-4  dark:text-black">
                    {object.Reply } Replies
                </p>
                    <div class="grow ">

                    </div>
                    <p class="text-sm me-4 font-bold py-1 dark:text-black">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default MobileForumList