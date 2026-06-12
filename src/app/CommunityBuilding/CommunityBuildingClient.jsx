'use client';

import { useMemo, useState, useEffect } from 'react';
import donors from './donors';
import { FaTools, FaHandsHelping, FaDonate, FaPeopleCarry } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import Link from "next/link";

// --- SUB-COMPONENT: DonorsTable ---
const DonorsTable = () => {
  const [pledgeFilter, setPledgeFilter] = useState('all');

  const calculateDollarDayCommitment = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dailyRate = 1; 
    return diffDays > 0 ? diffDays * dailyRate : 0;
  };

  const processedDonors = useMemo(() => {
    const filtered = pledgeFilter === 'all' 
      ? donors 
      : donors.filter((d) => d.pledgeType === pledgeFilter);

    return filtered.map((donor) => {
      if (donor.pledgeType === 'dollarDay') {
        return {
          ...donor,
          commitment: calculateDollarDayCommitment(donor.startDate, donor.endDate),
        };
      }
      return { ...donor, commitment: Number(donor.commitment) || 0 };
    });
  }, [pledgeFilter]);

  const totalC = processedDonors.reduce((sum, d) => sum + d.commitment, 0);
  const totalD = processedDonors.reduce((sum, d) => sum + (Number(d.donated) || 0), 0);

  return (
    <section className="py-16 bg-pink-50 dark:bg-gray-800 px-4 rounded-3xl my-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-pink-700 dark:text-pink-300 mb-6">
          Donors and Commitments
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {['all', 'lumpSum', 'dollarDay'].map((type) => (
            <button
              key={type}
              onClick={() => setPledgeFilter(type)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                pledgeFilter === type ? 'bg-pink-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white'
              }`}
            >
              {type === 'all' ? 'All' : type === 'lumpSum' ? 'Lump Sum' : 'Dollar A Day'}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
            <thead className="bg-pink-200 dark:bg-pink-700 text-pink-900 dark:text-white">
              <tr>
                <th className="py-3 px-4 text-left">S.No.</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Pledge Type</th>
                {pledgeFilter === 'dollarDay' && (
                  <><th className="py-3 px-4 text-left">Start Date</th><th className="py-3 px-4 text-left">End Date</th></>
                )}
                <th className="py-3 px-4 text-left">Commitment</th>
                <th className="py-3 px-4 text-left">Donated</th>
                <th className="py-3 px-4 text-left">Remaining</th>
                <th className="py-3 px-4 text-left">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {processedDonors.map((donor, index) => {
                const remaining = Math.max(0, donor.commitment - (Number(donor.donated) || 0));
                return (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-700 even:bg-pink-50/50 dark:even:bg-gray-800/50">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{donor.name}</td>
                    <td className="py-3 px-4">{donor.pledgeType === 'dollarDay' ? 'Dollar A Day' : 'Lump Sum'}</td>
                    {pledgeFilter === 'dollarDay' && (
                      <><td className="py-3 px-4 text-sm">{donor.startDate || '-'}</td><td className="py-3 px-4 text-sm">{donor.endDate || '-'}</td></>
                    )}
                    <td className="py-3 px-4">${donor.commitment.toLocaleString()}</td>
                    <td className="py-3 px-4">${(Number(donor.donated) || 0).toLocaleString()}</td>
                    <td className="py-3 px-4 text-red-600 font-semibold">${remaining.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">
                      {donor.commitment === Number(donor.donated) ? 'Fully Donated' : !donor.donated ? 'No Donation Yet' : 'Partially Donated'}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-pink-100 dark:bg-pink-900 font-bold">
                <td className="py-3 px-4 text-right" colSpan={pledgeFilter === 'dollarDay' ? 5 : 3}>Totals:</td>
                <td className="py-3 px-4">${totalC.toLocaleString()}</td>
                <td className="py-3 px-4 text-green-600">${totalD.toLocaleString()}</td>
                <td className="py-3 px-4 text-red-600">${(totalC - totalD).toLocaleString()}</td>
                <td className="py-3 px-4 text-sm italic">{processedDonors.length} Donors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const CommunityBuildingClient = () => {
  const [pptFiles, setPptFiles] = useState([]);
  const [noteFiles, setNoteFiles] = useState([]);
  const [selectedPPT, setSelectedPPT] = useState('');
  const [selectedNote, setSelectedNote] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch('/api/community-files');
        const data = await res.json();
        setPptFiles(data.pptFiles || []);
        setNoteFiles(data.noteFiles || []);
        if (data.pptFiles?.length > 0) setSelectedPPT(data.pptFiles[0].value);
        if (data.noteFiles?.length > 0) setSelectedNote(data.noteFiles[0].value);
      } catch (err) {
        console.error('Failed to load files', err);
      }
    };
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 px-4">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/community-building/banner.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl text-white animate-fade-in-up px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Future Community Center</h1>
          <p className="text-lg sm:text-xl font-medium mb-6">Together, we're building our legacy.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/Donations"><button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition">💖 Donate Now</button></Link>
            <Link href="/Donations"><button className="bg-white text-pink-600 font-bold px-6 py-3 rounded-full hover:scale-105 transition">🏛️ Join the Vision</button></Link>
          </div>
        </div>
      </section>

      {/* Intro Icons Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-4">Why a Community Center?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-pink-400">
            <FaHandsHelping className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Community United</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-yellow-400">
            <FaDonate className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Transparent Giving</h3>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-green-400">
            <FaPeopleCarry className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Built Together</h3>
          </div>
        </div>
      </section>

      {/* Coordinators */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-pink-600">Community Building Coordinators</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Mr. Diwakar Pandey", role: "Coordination Committee", phone: "+1(516) 728-7748", color: "from-blue-400 to-blue-600" },
            { name: "Mr. Durgesh Karki", role: "Finance Coordinator", phone: "1(646) 704-3348", color: "from-yellow-400 to-yellow-600" },
            { name: "Mr. Bivek Gautam", role: "Law & Technical", phone: "+1(347) 513-1708", color: "from-green-400 to-green-600" },
            { name: "Mr. Surya Poudel", role: "Publicity Committee", phone: "+1(516) 605-5699", color: "from-purple-400 to-purple-600" },
          ].map((member, index) => (
            <div key={index} className="relative bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-sm opacity-80 mb-5">{member.role}</p>
              <a href={`tel:${member.phone}`} className="absolute top-3 right-3 text-blue-500 hover:scale-110 transition"><MdPhone size={24} /></a>
            </div>
          ))}
        </div>
      </section>

      {/* Meeting Files */}
      <section className="py-16 max-w-6xl mx-auto space-y-12">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-400">
            <h3 className="text-xl font-bold text-blue-600 mb-4">📄 Meeting Presentation Slides</h3>
            <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700" value={selectedPPT} onChange={(e) => setSelectedPPT(e.target.value)}>
               {pptFiles.map((file, i) => <option key={i} value={file.value}>{file.label}</option>)}
            </select>
            {selectedPPT && <iframe src={selectedPPT} width="100%" height="500" title="Slide Preview" />}
         </div>

         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-indigo-400">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">📝 Meeting Notes</h3>
            <select className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700" value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)}>
               {noteFiles.map((file, i) => <option key={i} value={file.value}>{file.label}</option>)}
            </select>
            {selectedNote && <iframe src={selectedNote} width="100%" height="500" title="Notes Preview" />}
         </div>
      </section>

      {/* MOVED THE TABLE COMPONENT HERE */}
      <DonorsTable />

      {/* Legal Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-yellow-700 mb-4">ByLaws ARTICLE XI: Section 8</h3>
          <div className="space-y-4 text-justify font-serif">
            <p>The community building project shall be managed by an entity trusted by the Long Island Nepalese Society...</p>
            <p className="mt-10 font-bold text-blue-600">सामुदायिक निर्माण परियोजनाको प्रावधान</p>
            <p>सामुदायिक निर्माण परियोजना लङ आइल्याण्ड नेपाली समाजद्वारा विश्वसनीय संस्थाद्वारा व्यवस्थापन गरिनेछ...</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CommunityBuildingClient;