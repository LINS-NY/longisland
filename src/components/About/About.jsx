'use client';
import * as React from 'react';
import LifeTimeMember from './LifeTimeMember';
import ElectedMembers from './ElectedMembers';
import GeneralMember from './GeneralMember';
import { useEffect, useState } from 'react';
import { usePapaParse } from 'react-papaparse';

const About = () => {
    return (
        <div class="  bg-white flex">
            <div class="max-w-screen-xl flex flex-col mx-auto p-4">
                <div class="flex flex-col justify-center items-center ">
                    <h1 class="font-bold text-2xl">LINS-NY</h1>
                    <article class="indent-4 text-pretty text-justify font-serif font-medium  dark:text-gray-400">
                        <p class="p-2 md:px-5">नेपाल क्षेत्रफलमा सानोहोला तर यहाँको सामाजिक, सांस्कृतिक, भौगोलीक बिबिधता चाही फराकिलो छ।  नेपाल सगरमाथा र भगवान बुद्धको जन्मस्थलले मात्र अन्तराष्ट्रिय जगतमा चिनाएको छैन की नेपालीहरु श्रमशील, मिलनसार, बहुसांस्कृतिक र ईमान्दार नागरिक भनेर नेपाललीले अन्तर्राष्ट्रिय समुदायमा आफ्नो छुट्टै पहिचान बनाएको छ।
                        </p>
                        <p class="p-2 md:px-5">नेपाल सरकारले अमेरिकासंग  कूटनीतिक सम्बन्ध १९४७ मा नै स्थापना गरे पनि नेपालीहरुको आगमन १९९० को दशकको अन्त्यतिरबाट नेपालीहरुको आगमन ब्यापक रुपमा भएको देखिन्छ। हालका दिनहरुमा हरेक वर्ष, ठूलो संख्यामा नेपालीहरू उच्च शिक्षा, डाईभरसिटी कार्यक्रमबाट स्थाई बसोबास गर्न, व्यवसाय र अन्य अवसरहरूको
                            खोजीमा अमेरिकालाई सपनाको सबैभन्दा प्राथमिकता गन्तब्य देशको रुपमा नेपालीहरुको आगमन भएको पाईन्छ।
                        </p>
                        <p class="p-2 md:px-5">अमेरिकाको पनि न्युयोर्क सहर घेरै नेपालीहरुको बसोबासकोलागी उत्तम ठाउको रुपमा रोजाई रहेको छ।
                        </p>
                        <p class="p-2 md:px-5">न्युयोर्क सहरको नजिकै रहेको सबअर्ब क्षेत्र ‘लंगआईल्यान्ड ‘ बसोबासको लागि अत्यन्तै सहज र सुन्दर ठाउँ रहेको छ।न्युयोर्क सहरको नजिक तर शान्त र रमणिय, समुन्द्रको नजिक तथा पार्क, उत्कृष्ट बिध्यालय र युनिभर्सिटीहरु र अन्य आकर्षणहरु रहेको यस लंग आईल्यान्डमा नासा र सफ्लक दूईबटा काउन्टीहरु दिन प्रतिदिन नेपालीहरुको पनि बसोबास बढ्दै गईरहेको छ।
                            २०१० तिरसम्म आईपुग्दा जम्मा करिब २०० जना नेपालीहरुको हिक्सभिल तथा लेभिटाउन सिटीहरुमा केन्द्रीत रहेर बसोबास देखिन्छ। बिदेशि भूमिमा आएर पनि यहाँ नेपालीहरुको भेटघाट होस, सद्भाब र भाईचाराहोस्। संगै चाडबाड मनाउन सकियोस र दुख पर्दा एकअर्कामा सहयोग होस् भन्ने हेतुले २०१० मा स्थानिय केहि ब्यक्तित्वहरुको पहलमा लंगआईल्यान्ड नेपाली समाजको संस्था स्थापना भएको हो। संस्थालाई आधिकारीक रुपमा २०१२ मा दर्तागरि संचालन गरिएको नेपालीहरुको संस्था हालसम्म स्थानिय नेपाली समाज, न्युयोर्क र अमेरिका भरि नै एउटा परिचित ठुलो सामाजिक सँस्थाको रुपमा चिर परिचीत छ।
                            हाल करिब ५००० जनाजती नेपाली बसोबास रहेको  छ र ७१० जनाजती रजिष्टर्ड सदस्यगरु रहेको छ।
                        </p>
                        <p class="p-2 md:px-5">अधिकांश नेपालीहरूले साझा आकांक्षाहरू कसरी पूरा गर्न सकिन्छ र कसरी विचारहरू आदानप्रदान गर्न सकिन्छ र प्रगतिका अवसरहरू बढाउन सकिन्छ; र अझ महत्त्वपूर्ण कुरा, कसरी एउटै पहिचान निर्माण गर्न, एक भएर अगाडि बढ्न, र एकजुट भई हामीले हाम्रो परिवार र देशबाट प्राप्त गरेको आकांक्षालाई पूरा गर्न सकिन्छ भन्ने कुरा आवश्यकतालाई महसुस भएको छ र सो को लागि यो समाजले सेतूको काम गर्दै आईरहेको छ र अब पनि यो संस्था मार्फत हामी हाम्रो विचारहरू, समस्याहरू आदानप्रदान गर्न सकौं र अरू नेपालीहरूलाई उनीहरूको समस्याबाट मद्दत गर्न सकौं। यस्तो एकता र सहयोगको पवित्र भावना
                            (क्रमस.....)
                        </p>
                    </article>
                </div>
                <Member />
            </div>
        </div>
    )
}


function Member() {
    const [lifeMember, setLifeMember] = useState([{}]);
    const [yearlyMember, setYearlyMember] = useState([{}]);
    const [all, setAll] = useState([{}]);
    const [displayMember, setDisplayMember] = useState([])
    const [membership, setMembership] = useState("All");
    const [popup, setPopup] = useState(false)
    const [selected, setSelected] = useState(membership)
    const { readString } = usePapaParse();

    useEffect(() => {
        fetch('./AllMembers.csv')
            .then(response => response.text())
            .then(csvText => {
                readString(csvText, {
                    worker: true,
                    complete: (results) => {
                        const lifeTimeMember = []
                        const regularMember = []
                        Object.entries(results["data"]).map((v, index) => {
                            if (v[1][1] == "") {
                                lifeTimeMember.push(<LifeTimeMember name={v[1][0]} key={`${index}_${v[1][0]}`} id={index + 1} />)
                            } else if (v[1] == "") {
                                return
                            } else {
                                regularMember.push(<GeneralMember key={`${index}_${v[1][0]}`} name={v[1][0]} expiration={v[1][1]} id={index + 1} />)
                            }
                        });
                        setDisplayMember([...lifeTimeMember, ...regularMember])
                        setLifeMember(lifeTimeMember)
                        setYearlyMember(regularMember)
                        setAll([...lifeTimeMember, ...regularMember])
                    },
                })
            })
    }, [readString]);

    const handleClick = () => {
        setPopup(!popup)
    }
    const handleSelection = (value) => {
        setPopup(!popup)
        setMembership(value.target.innerText.trim())
        setSelected(value.target.innerText.trim())
        if (value.target.innerText.trim() == "Life Time") {
            setDisplayMember(lifeMember)
        } else if (value.target.innerText.trim() == "All") {
            setDisplayMember(all)
        } else {
            setDisplayMember(yearlyMember)
        }
    }
    return (
        <div class=" bg-white flex flex-col ">
            <ElectedMembers />
            <div class="w-96 sm:w-5/6 justify-center mx-auto">
                <h4 class="font-bold text-center text-md lg:text-2xl bg-white mx-auto py-2 ">Long Island Nepalese Society - New York</h4>
                <h4 class="font-bold text-center text-md lg:text-2xl bg-white mx-auto py-2">Registered Membership List</h4>
                <h1 class="font-bold whitespace-pre">
                    Life Time Members: {lifeMember.length}<br />
                    General Members:    {yearlyMember.length}<br />
                    <button class="bg-lime-400 hover:bg-lime-300 text-black font-medium md:font-bold md:py-2 md:px-4 border-b-4 my-1
                                    border-blue-700 hover:border-red-500">Total Members: {all.length}</button>
                </h1>
                <div class=" lg:px-2 px-1 lg:py-6 shadow-lg shadow-cyan-500/50 ">
                    <div class="overflow-hidden ">
                        <table class="w-full text-center text-sm font-light dark:text-white border-collapse ">
                            <thead class="shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 bg-sky-500/100 rounded-3xl">
                                <tr class="rounded-3xl">
                                    <th scope="col" class=" font-bold md:px-6 px-1 py-1 md:py-4">Member Name</th>
                                    <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">Membership Expiration Date</th>
                                    <th scope="col" class="font-bold md:px-6 px-1 py-1 md:py-4">
                                        <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900">Membership Type</label>
                                        <div class="relative mt-2">
                                            <button type="button"
                                                class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label"
                                                onClick={handleClick}
                                            >
                                                <span class="flex items-center">
                                                    <span class="ml-3 block truncate">{membership}</span>
                                                </span>
                                                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                        <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                                                    </svg>
                                                </span>
                                            </button>
                                            {popup && (
                                                <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                                                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" onClick={e => handleSelection(e)} id="listbox-option-0" role="option">
                                                        <div class="flex items-center">
                                                            <span class="font-normal ml-3 block truncate">Life Time</span>
                                                        </div>
                                                        {selected == "Life Time" &&
                                                            (<span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-1 sm:pr-4">
                                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                                </svg>
                                                            </span>)
                                                        }
                                                    </li>
                                                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" onClick={e => handleSelection(e)} id="listbox-option-1" role="option">
                                                        <div class="flex items-center">
                                                            <span class="font-normal ml-3 block truncate">Yearly</span>
                                                        </div>
                                                        {selected == "Yearly" && (
                                                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </li>
                                                    <li class="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" onClick={e => handleSelection(e)} id="listbox-option-2" role="option">
                                                        <div class="flex items-center">
                                                            <span class="font-normal ml-3 block truncate">All</span>
                                                        </div>
                                                        {selected == "All" && (
                                                            <span class="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </li>
                                                </ul>
                                            )}
                                        </div>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayMember}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default About