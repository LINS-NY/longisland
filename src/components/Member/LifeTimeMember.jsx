import * as React from 'react';

const LifeTimeMember = ({id,name}) => {
    return(
        <tr className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10 hover:bg-cyan-200">
            <td className="capitalize lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-bold text-teal-600">{name}</td>
            <td className="lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-bold text-teal-600">Never</td>
            <td className="lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-bold text-teal-600">Life Time</td>
        </tr>
    )
}

export default LifeTimeMember


