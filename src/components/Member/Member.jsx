'use client'
import LifeTimeMember from './LifeTimeMember';
import ElectedMembers from './ElectedMembers';
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
        <div class=" bg-white flex flex-col ">
            <ElectedMembers/>
            <div class="w-96 sm:w-5/6 justify-center mx-auto">
                <h4 class="font-bold text-center text-md lg:text-2xl bg-white mx-auto py-2">Membership List</h4>
            <div class=" lg:px-2 px-1 lg:py-8 shadow-lg shadow-cyan-500/50 ">
                <div class="overflow-hidden ">
                    <table class="w-full text-center text-sm font-light dark:text-white border-collapse ">
                        <thead class="shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 bg-sky-500/100 rounded-3xl">                                    
                            <tr class="rounded-3xl">    
                                <th scope="col" class=" font-bold md:px-6 px-1 py-1 md:py-4">Member Name</th>
                                <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">Membership Expiration Date</th>
                                <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">Membership Type</th>
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