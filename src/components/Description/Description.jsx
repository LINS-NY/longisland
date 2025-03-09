import * as React from 'react';

const Description = ({ description }) => {
    console.log(description)
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500">
            <div className="text-center">
                <div className="flex justify-center font-bold font-serif text-2xl text-white py-1">
                    {description.englishProgramName && Array.isArray(description.englishProgramName) ?
                        description.englishProgramName.map((object, i) => (
                            <li key={i}>{object}</li>
                        )) :
                        <li>{description.englishProgramName}</li> // Fallback if it's not an array
                    }
                </div>
                <div className="flex justify-center font-bold font-serif text-2xl text-white py-1">
                    {description.nepaliProgramName && Array.isArray(description.nepaliProgramName) ?
                        description.nepaliProgramName.map((object, i) => (
                            <li key={i}>{object}</li>
                        )) :
                        <li>{description.nepaliProgramName}</li> // Fallback if it's not an array
                    }
                </div>

            </div>
        </div>
    )
}
export default Description