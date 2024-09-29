import * as React from 'react';
import { useRouter } from 'next/navigation'

const IndividualForum = ({data}) => {
    const router = useRouter()
    return ( 
        <tbody>
            { data && data.map(function(object, i){
                    return(
                    <tr key={object.id} onClick={() => {
                        router.push(`/Forum/${object.id}/?Topic=${object.Topic}`)
                        }}>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" id={i}>
                            <div class="flex items-center " id={i}>
                                    <div class="ml-3" id={i}>
                                        <p class="text-gray-900 whitespace-no-wrap" id={i}>
                                            {object.Topic}
                                        </p>
                                    </div>
                                </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" id={i}>
                            <p class="text-gray-900 whitespace-no-wrap" id={i}>{object.creator}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" id={i}>
                            <p class="text-gray-900 whitespace-no-wrap" id={i}>
                            2
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" id={i}>
                            <p class="text-gray-900 whitespace-no-wrap" id={i}>30 mins Ago</p>
                        </td>
                    </tr>
                    )
                }
            )}
        </tbody>
       
    )
}

export default IndividualForum