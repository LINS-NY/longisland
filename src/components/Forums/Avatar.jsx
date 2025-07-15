import * as React from "react";


const Avatar = ({name}) => {
    return (
        <div className="ml-2 relative inline-flex items-center justify-center w-6 h-6  md:w-10 md:h-10 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600" >
            <span className="font-medium text-gray-600 dark:text-gray-200">{name.split(" ").map((n)=>n[0]).join("")}</span>
        </div>
    )
}

export default Avatar