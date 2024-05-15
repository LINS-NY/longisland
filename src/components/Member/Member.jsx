'use client'
import LifeTimeMember from './LifeTimeMember';
import GeneralMember from './GeneralMember';
import { useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';


function Member(){
    const [ member, setMember ] = useState([{}]);
    const { readString } = usePapaParse();

    useEffect(() => {
        fetch( './AllMembers.csv' )
        .then( response => response.text() )
        .then( csvText => {
            readString(csvText, {
                worker: true,
                complete: (results) => {
                  setMember(results["data"]);
                },
              })
        })
      }, []);
    let members = []
    Object.entries(member).map((v,index)=>{
        if (v[1][1] == ""){
            members.push(<LifeTimeMember name={v[1][0]} key={index} id={index+1}/>)
        }else if(v[1] == ""){
            return;
        }else{
        members.push(<GeneralMember key={index} name={v[1][0]} expiration={v[1][1]} id={index+1} />)
        }
    })
    return(
        <div class="flex bg-white g9flex-col">
            <div class="mx-auto p-4 font-bold text-2xl bg-white text-red-600">Membership List</div>
            <div class="overflow-x-auto sm:-mx-1 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-1 lg:px-8">
                    <div class="overflow-hidden">
                        <table 
                            class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                            <thead
                                class="border-b">                                    
                                <tr>    
                                    <th scope="col" class="px-6 py-4">ID.</th>
                                    <th scope="col" class="px-6 py-4">Member Name</th>
                                    <th scope="col" class="px-6 py-4">Membership Expiration Date</th>
                                    <th scope="col" class="px-6 py-4">Membership Type</th>
                                </tr>
                            </thead>
                            <tbody>  
                                 {members}            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  
    )
}

export default Member