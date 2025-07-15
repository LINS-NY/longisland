import * as React from "react";


const Avatar = ({name}) => {
    return (
        <div className="mx-1 relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" >
            <span className="font-small text-gray-600 dark:text-gray-300">{name.split(" ").map((n)=>n[0]).join("")}</span>
        </div>
    )
}

export default Avatar