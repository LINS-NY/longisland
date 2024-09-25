import * as React from "react";


const Avatar = ({name}) => {
    return (
        <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" >
            <span class="font-medium text-gray-600 dark:text-gray-300">{name.split(" ").map((n)=>n[0]).join("")}</span>
        </div>
    )
}

export default Avatar