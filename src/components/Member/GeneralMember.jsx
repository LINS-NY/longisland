import * as React from 'react';

const GeneralMember = ({id,name,expiration}) => {
    return(
        <tr class="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
            <td class="whitespace-nowrap px-6 py-4 font-medium">{id}</td>
            <td class="capitalize whitespace-nowrap px-6 py-4">{name}</td>
            <td class="whitespace-nowrap px-6 py-4">{expiration}</td>
            <td class="whitespace-nowrap px-6 py-4">General</td>
        </tr>
    )
}

export default GeneralMember


