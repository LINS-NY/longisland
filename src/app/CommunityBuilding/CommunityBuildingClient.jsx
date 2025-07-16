'use client';
import donors from './donors';
import PDFViewer from './PDFViewer';
import { useState } from 'react';
import { FaTools, FaHandsHelping, FaDonate, FaPeopleCarry } from 'react-icons/fa';

// Presentation and Notes dropdown options
const pptFiles = [
  { label: 'Community-Building3.pdf', value: '/Community Building Files/PowerPoint/Community-Building3.pdf' },
  { label: 'Community-Building2.pdf', value: '/Community Building Files/PowerPoint/Community-Building2.pdf' },
  { label: 'Community-Building.pdf', value: '/Community Building Files/PowerPoint/Community-Building.pdf' },
];

const noteFiles = [
  { label: 'Community-Building3.pdf', value: '/Community Building Files/Notes/Community-Building3.pdf' },
  { label: 'Community-Building2.pdf', value: '/Community Building Files/Notes/Community-Building2.pdf' },
  { label: 'Community-Building.pdf', value: '/Community Building Files/Notes/Community-Building.pdf' },
];

const CommunityBuildingClient = ({ pptFiles, noteFiles }) => {

  const [selectedPPT, setSelectedPPT] = useState(pptFiles[0].value);
  const [selectedNote, setSelectedNote] = useState(noteFiles[0].value);

  const totalCommitment = donors.reduce((sum, d) => sum + d.commitment, 0);
  const totalDonated = donors.reduce((sum, d) => sum + d.donated, 0);
  const totalDonors = donors.length;

   return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-100 px-4">
        {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/community-building/banner.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl text-white animate-fade-in-up px-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg mb-4">
            Our Future Community Center
          </h1>
          <p className="text-lg sm:text-xl font-medium mb-6">
            Together, we're building more than a structure — we're building our legacy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition">
              💖 Donate Now
            </button>
            <button className="bg-white text-pink-600 font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition">
              🏛️ Join the Vision
            </button>
          </div>

          {/* Under Construction Message */}
          <div className="flex items-center justify-center gap-3 text-red-500">
            <FaTools className="text-5xl text-red-600 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-md">
              This Page is Under Construction!
            </h2>
          </div>
        </div>
      </section>

      {/* Why a Community Center Section */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-4">Why a Community Center?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-12">
          A permanent home for LINSNY will allow us to host cultural events, serve our members better, and build lasting connections for generations to come.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-pink-400">
            <FaHandsHelping className="text-4xl text-pink-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Community United</h3>
            <p className="text-sm mt-2">An inclusive space to gather, share, and celebrate our identity.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-yellow-400">
            <FaDonate className="text-4xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Transparent Giving</h3>
            <p className="text-sm mt-2">All pledges and donations are acknowledged and tracked publicly.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-green-400">
            <FaPeopleCarry className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Built Together</h3>
            <p className="text-sm mt-2">Led by LINSNYTFCC, blending executive and life-time members.</p>
          </div>
        </div>
      </section>

{/* Meeting Slides & Notes Section */}
<section className="py-16 max-w-6xl mx-auto space-y-12">
  {/* PPTX Preview */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-400">
    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-4">📄 Meeting Presentation Slides (PDF)</h3>
    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Select a presentation:</label>
    <select
      className="w-full mb-4 p-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-700"
      value={selectedPPT}
      onChange={(e) => setSelectedPPT(e.target.value)}
    >
      {pptFiles.map((file, index) => (
        <option key={index} value={file.value}>{file.label}</option>
      ))}
    </select>
    <div className="bg-white rounded-xl border overflow-hidden">
         {/* PDF Reader */}
          <h3 className="text-xl font-bold mb-2">📄 Meeting Presentation Slides (PDF)s</h3>
          <PDFViewer fileUrl={selectedPPT} />
    </div>
    <div className="mt-4 text-center">
      <a
        href={selectedPPT}
        download
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow transition"
      >
        ⬇️ Download Selected Slide
      </a>
    </div>
  </div>

  {/* Notes PDF Preview */}
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-indigo-400">
    <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-300 mb-4">📝 Meeting Notes (PDF)</h3>
    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Select meeting notes:</label>
    <select
      className="w-full mb-4 p-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-700"
      value={selectedNote}
      onChange={(e) => setSelectedNote(e.target.value)}
    >
      {noteFiles.map((file, index) => (
        <option key={index} value={file.value}>{file.label}</option>
      ))}
    </select>
    <div className="bg-white rounded-xl border overflow-hidden">
        {/* PDF Reader */}
        <h3 className="text-xl font-bold mb-2">Meeting Notes</h3>
        <PDFViewer fileUrl={selectedNote} />
    </div>
    <div className="mt-4 text-center">
      <a
        href={selectedNote}
        download
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-full shadow transition"
      >
        ⬇️ Download Selected Note
      </a>
    </div>
  </div>
</section>


      {/* Donor Table */}
      <section className="py-16 bg-pink-50 dark:bg-gray-800 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-pink-700 dark:text-pink-300 mb-6">Donors and Commitments</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <thead className="bg-pink-200 dark:bg-pink-700 text-pink-900 dark:text-white">
                <tr>
                  <th className="py-3 px-4 text-left">S.No.</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Commitment</th>
                  <th className="py-3 px-4 text-left">Donated</th>
                  <th className="py-3 px-4 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => (
                  <tr key={index} className="even:bg-pink-50 dark:even:bg-gray-700">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{donor.name}</td>
                    <td className="py-3 px-4">${donor.commitment.toLocaleString()}</td>
                    <td className="py-3 px-4">${donor.donated.toLocaleString()}</td>
                    <td className="py-3 px-4 text-sm">{donor.remarks}</td>
                  </tr>
                ))}
                <tr className="bg-pink-100 dark:bg-pink-900 font-bold">
                  <td className="py-3 px-4" colSpan={2}>Total</td>
                  <td className="py-3 px-4">${totalCommitment.toLocaleString()}</td>
                  <td className="py-3 px-4">${totalDonated.toLocaleString()}</td>
                  <td className="py-3 px-4">{totalDonors} Donors</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fade In Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>  
  );
};


export default CommunityBuildingClient;
