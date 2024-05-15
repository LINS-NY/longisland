import * as React from 'react';

const GeneralMember = ({id,name,expiration}) => {
    return(
        <tr class="border-b border-neutral-00 bg-black/[0.02] dark:border-white/10 hover:bg-cyan-200">
            <td class="lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1 font-medium">{id}</td>
            <td class="capitalize lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1">{name}</td>
            <td class="lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1">{expiration}</td>
            <td class="lg:whitespace-nowrap lg:px-6 px-1 lg:py-4 py-1">General</td>
        </tr>
    )
}

export default GeneralMember


