'use client';

import React, { useState, useEffect } from 'react';
import ElectedMembers from '../About/ElectedMembers';
import { usePapaParse } from 'react-papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Image from 'next/image'

/**
 * Back-to-top link component
 */
const BackToTop = () => (
    <div className="text-center mt-8">
        <a href="#about" className="text-blue-600 hover:underline">⬆ Back to Top</a>
    </div>
);

const MemberData = ({ name, expiration, type }) => {
    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4 text-left font-medium text-gray-900">{name}</td>
            <td className="px-6 py-4 text-gray-700">{expiration || "Never"}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    type === "Junior" 
                        ? "bg-orange-100 text-orange-700" 
                        : type === "Life Time" || type === "Lifetime"
                        ? "bg-purple-100 text-purple-700" 
                        : "bg-green-100 text-green-700"
                }`}>
                    {type}
                </span>
            </td>
        </tr>
    );
};

/**
 * Membership table with:
 * - Summary counts
 * - Search (left label)
 * - CSV and PDF download
 * - Row numbers
 * - Sticky header
 */
function MembershipTable() {
    const [allMembers, setAllMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [lifetimeCount, setLifetimeCount] = useState(0);
    const [generalCount, setGeneralCount] = useState(0);
    const [juniorCount, setJuniorCount] = useState(0);
    const { readString } = usePapaParse();

   useEffect(() => {
        fetch('./AllMembers.csv')
            .then(response => response.text())
            .then(csvText => {
                readString(csvText, {
                    worker: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const lifetime = [];
                        const general = [];
                        const junior = []; // Junior Array

                        results.data.forEach((row) => {
                            const rawName = row?.[0]?.trim() || '';
                            const expirationRaw = row?.[1];
                            const expiration = typeof expirationRaw === 'string' ? expirationRaw.trim() : '';
                            const typeIndicator = row?.[2] ? row[2].trim().toLowerCase() : '';

                            if (!rawName || rawName === 'Member Name') return;

                            let type = 'General';
                            
                            // UPDATED: Logic focused on Junior identification
                            const isJunior = typeIndicator === 'junior' || rawName.toLowerCase().includes('junior');

                            if (isJunior) {
                                type = 'Junior';
                            } else if (!expiration || expiration === '' || expiration.toLowerCase() === 'lifetime' || expiration === '—') {
                                type = 'Lifetime';
                            } else {
                                type = 'General';
                            }

                            // Clean name for display
                            const displayName = rawName.replace(/\(Junior\)/gi, "").trim();

                            const memberRow = {
                                name: displayName,
                                expiration: expiration || '—',
                                type
                            };

                            if (type === 'Junior') junior.push(memberRow);
                            else if (type === 'Lifetime') lifetime.push(memberRow);
                            else general.push(memberRow);
                        });

                        const sortFn = (a, b) => a.name.localeCompare(b.name);
                        lifetime.sort(sortFn);
                        general.sort(sortFn);
                        junior.sort(sortFn);

                        const combined = [...lifetime, ...general, ...junior];
                        setLifetimeCount(lifetime.length);
                        setGeneralCount(general.length);
                        setJuniorCount(junior.length);
                        setAllMembers(combined);
                        setFilteredMembers(combined);
                    },
                });
            });
    }, [readString]);

    useEffect(() => {
        const filtered = allMembers.filter(m =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMembers(filtered);
    }, [searchTerm, allMembers]);

    // Export filtered view to CSV (Excel compatible)
    const exportCSV = () => {
        const header = 'Name,Expiration,Type,Status\n';
        const rows = filteredMembers
            .map(m => {
                const cleanExpiration = m.expiration === '—' || !m.expiration ? '' : m.expiration;
                return `${m.name},${cleanExpiration},${m.type},${m.status}`;
            })
            .join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'members_list.csv');
    };

    // Export filtered view to PDF with table
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Members List', 14, 16);
        autoTable(doc, {
            head: [['#', 'Name', 'Expiration', 'Type', 'Status']],
            body: filteredMembers.map((m, i) => [i + 1, m.name, m.expiration, m.type, m.status]),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [30, 58, 138] }, // blue-900
        });
        doc.save('members_list.pdf');
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
            {/* Membership Summary */}
            <div className="bg-green-100 border-l-4 border-green-600 text-green-900 p-4 mb-6 rounded-lg">
                <p className="font-semibold text-lg">📋 Membership Summary</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    <div className="font-medium">Lifetime Members: <strong>{lifetimeCount}</strong></div>
                    <div className="font-medium">General Members: <strong>{generalCount}</strong></div>
                     <div className="font-medium">Junior: <strong>{juniorCount}</strong></div>
                    <div className="font-medium">Total: <strong>{lifetimeCount + generalCount + juniorCount}</strong></div>

                </div>
            </div>

            {/* Search + Downloads */}
            <div className="mb-6 flex items-center justify-between flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <label className="text-lg font-bold text-blue-900 whitespace-nowrap">
                        Search
                    </label>
                    <input
                        type="text"
                        placeholder="🔍 Type Name here"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-4 py-3
                       bg-white-800 text-black font-medium
                       border-2 border-gray-600 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       shadow-md placeholder-gray-300"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                        onClick={exportCSV}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Download Excel
                    </button>
                    <button
                        onClick={exportPDF}
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto max-h-[600px]">
                <table className="min-w-full border-collapse">
                    <thead className="sticky top-0 bg-blue-900 text-white z-10">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Expiration</th>
                            <th className="px-4 py-2 text-left">Type</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMembers.map((m, i) => (
                            <tr key={`${m.name}-${i}`} className="hover:bg-gray-100 border-b">
                                <td className="px-4 py-2 font-semibold text-gray-600">{i + 1}</td>
                                <td className="px-4 py-2 font-medium">{m.name}</td>
                                <td className="px-4 py-2">{m.expiration}</td>
                                <td className="px-4 py-2">{m.type}</td>
                                <td className="px-4 py-2">
    <span className={`px-2 py-1 rounded-full text-sm ${
        // 1. If it's Lifetime OR Junior, make it Green/Blue Active
        (m.type === 'Lifetime' || m.type === 'Junior' || m.type === 'General')
            ? 'bg-green-100 text-green-800' 
            : m.status === 'Active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
    }`}>
        {(m.type === 'Lifetime' || m.type === 'Junior' || m.type === 'General') ? 'Active' : m.status}
    </span>
</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/**
 * Main About page
 */
function About() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Sticky nav */}
            <nav className="sticky top-0 z-50 bg-white shadow-md py-4">
                <div className="max-w-6xl mx-auto flex justify-center gap-6 text-blue-900 font-semibold text-lg">
                    <a href="#about" className="hover:text-blue-600">About LINS-NY</a>
                    <a href="#executives" className="hover:text-blue-600">Executive Members</a>
                    <a href="#members" className="hover:text-blue-600">Members Directory</a>
                </div>
            </nav>

            {/* About section */}
            <section id="about" className="max-w-5xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
                    About Long Island Nepalese Society - NY
                </h1>

                {/* Collapsible Article */}
                <article className="relative font-serif leading-relaxed text-justify">
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-full' : 'max-h-[12rem]'
                            }`}
                    >
                        <p className="p-2 md:px-5">नेपाल क्षेत्रफलमा सानोहोला तर यहाँको सामाजिक, सांस्कृतिक, भौगोलीक बिबिधता चाही फराकिलो छ।  नेपाल सगरमाथा र भगवान बुद्धको जन्मस्थलले मात्र अन्तराष्ट्रिय जगतमा चिनाएको छैन की नेपालीहरु श्रमशील, मिलनसार, बहुसांस्कृतिक र ईमान्दार नागरिक भनेर नेपाललीले अन्तर्राष्ट्रिय समुदायमा आफ्नो छुट्टै पहिचान बनाएको छ।
                        </p>
                        <p className="p-2 md:px-5">नेपाल सरकारले अमेरिकासंग  कूटनीतिक सम्बन्ध १९४७ मा नै स्थापना गरे पनि नेपालीहरुको आगमन १९९० को दशकको अन्त्यतिरबाट नेपालीहरुको आगमन ब्यापक रुपमा भएको देखिन्छ। हालका दिनहरुमा हरेक वर्ष, ठूलो संख्यामा नेपालीहरू उच्च शिक्षा, डाईभरसिटी कार्यक्रमबाट स्थाई बसोबास गर्न, व्यवसाय र अन्य अवसरहरूको
                            खोजीमा अमेरिकालाई सपनाको सबैभन्दा प्राथमिकता गन्तब्य देशको रुपमा नेपालीहरुको आगमन भएको पाईन्छ।
                        </p>
                        <p className="p-2 md:px-5">अमेरिकाको पनि न्युयोर्क सहर घेरै नेपालीहरुको बसोबासकोलागी उत्तम ठाउको रुपमा रोजाई रहेको छ।
                        </p>
                        <p className="p-2 md:px-5">न्युयोर्क सहरको नजिकै रहेको सबअर्ब क्षेत्र ‘लंगआईल्यान्ड ‘ बसोबासको लागि अत्यन्तै सहज र सुन्दर ठाउँ रहेको छ।न्युयोर्क सहरको नजिक तर शान्त र रमणिय, समुन्द्रको नजिक तथा पार्क, उत्कृष्ट बिध्यालय र युनिभर्सिटीहरु र अन्य आकर्षणहरु रहेको यस लंग आईल्यान्डमा नासा र सफ्लक दूईबटा काउन्टीहरु दिन प्रतिदिन नेपालीहरुको पनि बसोबास बढ्दै गईरहेको छ।
                            २०१० तिरसम्म आईपुग्दा जम्मा करिब २०० जना नेपालीहरुको हिक्सभिल तथा लेभिटाउन सिटीहरुमा केन्द्रीत रहेर बसोबास देखिन्छ। बिदेशि भूमिमा आएर पनि यहाँ नेपालीहरुको भेटघाट होस, सद्भाब र भाईचाराहोस्। संगै चाडबाड मनाउन सकियोस र दुख पर्दा एकअर्कामा सहयोग होस् भन्ने हेतुले २०१० मा स्थानिय केहि ब्यक्तित्वहरुको पहलमा लंगआईल्यान्ड नेपाली समाजको संस्था स्थापना भएको हो। संस्थालाई आधिकारीक रुपमा २०१२ मा दर्तागरि संचालन गरिएको नेपालीहरुको संस्था हालसम्म स्थानिय नेपाली समाज, न्युयोर्क र अमेरिका भरि नै एउटा परिचित ठुलो सामाजिक सँस्थाको रुपमा चिर परिचीत छ।
                            हाल करिब ५००० जनाजती नेपाली बसोबास रहेको  छ र ७१० जनाजती रजिष्टर्ड सदस्यगरु रहेको छ।
                        </p>
                        <p className="p-2 md:px-5">अधिकांश नेपालीहरूले साझा आकांक्षाहरू कसरी पूरा गर्न सकिन्छ र कसरी विचारहरू आदानप्रदान गर्न सकिन्छ र प्रगतिका अवसरहरू बढाउन सकिन्छ; र अझ महत्त्वपूर्ण कुरा, कसरी एउटै पहिचान निर्माण गर्न, एक भएर अगाडि बढ्न, र एकजुट भई हामीले हाम्रो परिवार र देशबाट प्राप्त गरेको आकांक्षालाई पूरा गर्न सकिन्छ भन्ने कुरा आवश्यकतालाई महसुस भएको छ र सो को लागि यो समाजले सेतूको काम गर्दै आईरहेको छ र अब पनि यो संस्था मार्फत हामी हाम्रो विचारहरू, समस्याहरू आदानप्रदान गर्न सकौं र अरू नेपालीहरूलाई उनीहरूको समस्याबाट मद्दत गर्न सकौं। यस्तो एकता र सहयोगको पवित्र भावना
                        </p>
                    </div>

                    {/* Continue Reading Button */}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="inline-block px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-full shadow-sm hover:bg-blue-200 transition"
                        >
                            {expanded ? 'Show Less' : '…Continue Reading'}
                        </button>
                    </div>
                </article>

                {/* Back to Top Link */}
                <div className="text-right mt-6">
                    <a
                        href="#about"
                        className="text-bold text-2xl text-blue-800 hover:text-blue-600 transition inline-flex items-center gap-1"
                    >
                        <span className="text-lg">↑</span> Back to Top
                    </a>
                </div>
            </section>

            {/* Executives */}
            <section id="executives" className="bg-white py-12">                
                <ElectedMembers />
                {/* Back to Top Link */}
                <div className="text-center mt-6">
                    <a
                        href="#about"
                        className="text-bold text-2xl text-blue-800 hover:text-blue-600 transition inline-flex items-center gap-1"
                    >
                        <span className="text-lg">↑</span> Back to Top
                    </a>
                </div>
            </section>

            {/* Members directory */}
            <section id="members" className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
                    Registered Members Directory
                </h2>
                <MembershipTable />
                {/* Back to Top Link */}
                <div className="text-center mt-6">
                    <a
                        href="#about"
                        className="text-bold text-2xl text-blue-800 hover:text-blue-600 transition inline-flex items-center gap-1"
                    >
                        <span className="text-lg">↑</span> Back to Top
                    </a>
                </div>
            </section>

            
                    {/*Developers */}
                    
                         <div> 
                    <br /><div className="flex-grow h-px bg-gray-400 py-0.5"></div>
                    <div className="flex justify-center font-extrabold font-serif text-5xl py-0.5">Developers</div>

                    <div className="flex items-center py-4">
                        <div className="flex-grow h-px bg-gray-400 py-0.5"></div>

                    </div>

                    <div className="grid grid-cols-3 px-8 place-items-center">
                        <Image
                            src="/BijendraBasnet.jpg"
                            width={130}
                            height={130}
                            alt="BijendraBasnet"
                        />
                        <Image
                            src="/DeepakAdhikari.jpg"
                            width={87}
                            height={95}
                            alt="DeepakAdhikari"
                        />
                        <Image
                            src="/Bikash Mainali.jpg"
                            width={97}
                            height={95}
                            alt="Bikash Mainali"
                        />
                        <p className=" text-center sm:font-extrabold leading-nonetext-blue-900 xl:text-2xl text-blue-950">
                            Bijendra <br />Basnet </p>
                        <p className=" text-center sm:font-bold leading-nonetext-blue-900 xl:text-2xl text-blue-950">
                            Deepak <br />Adhikari </p>
                        <p className=" text-center sm:font-bold leading-nonetext-blue-900 xl:text-2xl text-blue-950">
                            Bikash <br />Mainali</p></div>
                </div> 
                      
        </div>
    );
}

export default About;
