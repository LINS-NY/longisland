import * as React from 'react';

const LifeTimeMember = ({id,name}) => {
    return(
        <tr class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
            <td class="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
            <td class="capitalize whitespace-nowrap px-6 py-4 font-bold text-teal-600">{name}</td>
            <td class="whitespace-nowrap px-6 py-4 font-bold text-teal-600">Never</td>
            <td class="whitespace-nowrap px-6 py-4 font-bold text-teal-600">Life Time</td>
        </tr>
    )
}

export default LifeTimeMember


