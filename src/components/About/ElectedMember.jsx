import * as React from 'react';
import Image from 'next/image';

const ElectedMember = ({ name, nepaliName, position, nepaliPostion, imageLocation }) => {
    // Standardize empty paths with a default placeholder
    const imgSrc = imageLocation || "/Members/default.png";

    return (
        <div className="flex flex-col items-center p-4">
            {/* 1. FIXED CIRCULAR CONTAINER */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-blue-900 overflow-hidden shadow-md">
                <Image 
                    src={imgSrc}
                    alt={name}
                    fill // This fills the fixed 40x40 or 48x48 box
                    sizes="(max-width: 768px) 160px, 192px"
                    className="object-cover object-top" 
                /> 
            </div>

            {/* 2. TEXT SECTION */}
            <div className="text-center font-bold mt-4">
                <h4 className="text-rose-900 text-sm md:text-base leading-tight uppercase">
                    {position}
                </h4> 
                <h6 className="text-rose-900 text-sm md:text-base leading-tight">
                    ({nepaliPostion})
                </h6>
                <p className="text-sky-700 text-lg mt-2">
                    {name}
                </p>
                <p className="text-sky-700 text-md">
                    {nepaliName}
                </p> 
            </div>
        </div>
    );
}

export default ElectedMember;