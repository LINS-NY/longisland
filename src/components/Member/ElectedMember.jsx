import * as React from 'react';
import Image from 'next/image';

const ElectedMember = ({name,nepaliName,position,nepaliPostion,imageLocation}) => {
    return(
        <div className="relative flex flex-col w-96 md:w-5/6 md:mx-auto">
            <div className="relative mx-auto m-2 p-2">
                <Image 
                    src={imageLocation}
                    width={100}
                    height={100}
                    alt={name}
                    /> 
            </div>
            <div className="text-center font-bold">
                <h4 className=" text-rose-900 whitespace-pre">{position} </h4> 
                <h6 className=" text-rose-900 whitespace-pre"> ({nepaliPostion})</h6>
                <p className="text-sky-700">{name} </p>
                <p className="text-sky-700">{nepaliName}</p> 
            </div>

    </div>
    )
}

export default ElectedMember