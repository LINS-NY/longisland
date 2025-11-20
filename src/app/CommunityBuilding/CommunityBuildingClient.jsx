'use client';

import { useState, useEffect } from 'react';
import donors from './donors';
import { FaTools, FaHandsHelping, FaDonate, FaPeopleCarry } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md'; // Import icons from react-icons
import Link from "next/link";

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

        setPptFiles(data.pptFiles);
        setNoteFiles(data.noteFiles);

        if (data.pptFiles.length > 0) {
          setSelectedPPT(data.pptFiles[0].value);
        }

        if (data.noteFiles.length > 0) {
          setSelectedNote(data.noteFiles[0].value);
        }
      } catch (err) {
        console.error('Failed to load files', err);
      }
    };

    fetchFiles();
  }, []);

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
            <Link href="/Donations">
              <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition">
                💖 Donate Now
              </button>
            </Link>
            <Link href="/Donations">
            <button className="bg-white text-pink-600 font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition">
              🏛️ Join the Vision
            </button>
            </Link>
          </div>

           {/* Under Construction Message */}
          {/*<div className="flex items-center justify-center gap-3 text-red-500">
            <FaTools className="text-5xl text-red-600 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-extrabold drop-shadow-md">
              This Page is Under Construction!
            </h2>
          </div> */}
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

      {/* Community Building Coordinators - Stylized Glass Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 mb-12 animate-fade-in-up drop-shadow">
          Community Building Coordinators
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card Template */}
          {[
            {
              name: "Mr. Diwakar Pandey",
              role: "Coordination Committee Coordinator",
              phone: "+1(516) 728-7748",
              color: "from-blue-400 to-blue-600",
            },
            {
              name: "Mr. Durgesh Karki",
              role: "Finance / Program Coordinator",
              phone: "1(646) 704-3348",
              color: "from-yellow-400 to-yellow-600",
            },
            {
              name: "Mr. Bivek Gautam",
              role: "Law & Technical Committee",
              phone: "+1(347) 513-1708",
              color: "from-green-400 to-green-600",
            },
            {
              name: "Mr. Surya Poudel",
              role: "Publicity Committee",
              phone: "+1(516) 605-5699",
              color: "from-purple-400 to-purple-600",
            },
          ].map((member, index) => (
            <div
              key={index}
              className={`relative bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl`}
            >
              {/* Glowing Border Animation */}
              <div
                className={`absolute -inset-0.5 rounded-2xl z-[-1] bg-gradient-to-tr ${member.color} blur-sm opacity-60`}
              ></div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">{member.role}</p>

              {/* Call Icon */}
              <div className="absolute top-3 right-3">
                <a
                  href={`tel:${member.phone}`}
                  title={`Call ${member.name}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-white/90 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-blue-600 shadow-lg hover:scale-110 hover:text-blue-800 transition"
                >
                  <MdPhone size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/******Till Here*********/}

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
            {selectedPPT ? (
              <iframe
                src={selectedPPT}
                width="100%"
                height="500"
                className="w-full"
                title="Slide Preview"
              />
            ) : (
              <p className="text-red-500 text-sm p-4">No presentation selected or available.</p>
            )}

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
            {selectedPPT ? (
              <iframe
                src={selectedNote}
                width="100%"
                height="500"
                className="w-full"
                title="Slide Preview"
              />
            ) : (
              <p className="text-red-500 text-sm p-4">No presentation selected or available.</p>
            )}

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
                  <th className="py-3 px-4 text-left">Remaining</th>
                  <th className="py-3 px-4 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, index) => {
                  const remaining = Math.max(0, donor.commitment - donor.donated);

                  return (
                    <tr key={index} className="even:bg-pink-50 dark:even:bg-gray-700">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{donor.name}</td>
                      <td className="py-3 px-4">${donor.commitment.toLocaleString()}</td>
                      <td className="py-3 px-4">${donor.donated.toLocaleString()}</td>
                      <td className="py-3 px-4 text-red-600 font-semibold">${remaining.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">
                        {donor.commitment === donor.donated
                          ? 'Fully Donated'
                          : donor.donated === 0
                            ? 'No Donation Yet'
                            : 'Partially Donated'}
                      </td>
                    </tr>
                  );
                })}

                <tr className="bg-pink-100 dark:bg-pink-900 font-bold">
                  <td className="py-3 px-4 text-center text-blue-400 font-bold text-2xl" colSpan={2}>Total</td>
                  <td className="py-3 px-4 text-blue-400 font-bold text-xl">${totalCommitment.toLocaleString()}</td>
                  <td className="py-3 px-4 text-green-600 font-bold text-xl">${totalDonated.toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-400 font-bold text-xl">${(totalCommitment - totalDonated).toLocaleString()}</td>
                  <td className="py-3 px-4 text-blue-400 font-bold text-xl">{totalDonors} Donors</td>
                </tr>
              </tbody>


            </table>
          </div>
        </div>
      </section>


      {/* Legal Provision Section: Bylaws ARTICLE XI Section 8 */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-yellow-700 dark:text-yellow-400 mb-4 border-b pb-2">
            ByLaws ARTICLE XI: Section 8
          </h3>
          <h4
            className="text-lg sm:text-xl font-semibold font-serif mb-4 italic text-blue-700 dark:text-blue-400"
            style={{ color: 'rgb(59, 130, 246)' }} // fallback in case dark mode fails
          >  Provision for the Community Building Project
          </h4>
          {/* English Paragraphs */}
          <div className="space-y-4 text-gray-800 dark:text-gray-100 text-justify font-serif leading-relaxed text-[1.05rem]">
            <p>
              The community building project shall be managed by an entity trusted by the Long Island Nepalese Society. This entity (hereafter referred to as the <strong>"Long Island Nepalese Society New York Trust"</strong>) will operate independently but will always remain under the umbrella of the Long Island Nepalese Society.
            </p>
            <p>
              The framework of the Trustee shall be established under the oversight of LINSNY, led by the current Community Building Project Committee, formed under the leadership of the LINSNY President.
            </p>
            <p>
              The formation of the LINSNY Trust will be managed by the LINSNY Trustee Formation Coordination Committee (LINSNYTFCC). The LINSNYTFCC will be formed by the Trustee members. All members of LINSNYTFCC will work voluntarily.
            </p>
            <p>
              LINSNY shall have its President, Senior Vice President, General Secretary, and Treasurer serve as ex-officio members of LINSNYTFCC. The LINSNYTFCC must ensure that the ex-officio status of these LINSNY officers in the Trustee management board is preserved in the Trustee’s bylaws.
            </p>
            <p>
              Additionally, while forming the Trustee, the LINSNYTFCC shall ensure that the Trustee has sufficient authority to protect LINSNY’s assets under all circumstances.
            </p>
          </div>

          {/* Nepali Paragraphs */}
          <div className="space-y-4 mt-10 text-gray-800 dark:text-gray-100 text-justify font-[Kalimati, serif] leading-relaxed text-[1.05rem]">
            <h4
              className="text-lg sm:text-xl font-semibold font-serif mb-4 italic text-blue-700 dark:text-blue-400"
              style={{ color: 'rgb(59, 130, 246)' }} // fallback in case dark mode fails
            >        सामुदायिक निर्माण परियोजनाको प्रावधान
            </h4>
            <p>
              सामुदायिक निर्माण परियोजना लङ आइल्याण्ड नेपाली समाजद्वारा विश्वसनीय संस्थाद्वारा व्यवस्थापन गरिनेछ। यो संस्था (यसपछि <strong>"लङ आइल्याण्ड नेपाली समाज न्यूयोर्क ट्रस्ट"</strong> भनेर चिनिन्छ) स्वतन्त्र रूपमा सञ्चालन हुनेछ तर सधैं लङ आइल्याण्ड नेपाली समाजको छातामुनि रहनेछ।
            </p>
            <p>
              ट्रस्टीको रूपरेखा LINSNY को निरीक्षणमा स्थापित हुनेछ, जसको नेतृत्व LINSNY अध्यक्षको नेतृत्वमा गठन गरिएको वर्तमान सामुदायिक निर्माण परियोजना समितिले गर्नेछ।
            </p>
            <p>
              LINSNY ट्रस्टको गठन LINSNY ट्रस्टी गठन समन्वय समिति (LINSNYTFCC) द्वारा व्यवस्थापन गरिनेछ। LINSNYTFCC ट्रस्टी सदस्यहरूद्वारा गठन गरिनेछ। LINSNYTFCC का सबै सदस्यहरूले स्वेच्छाले काम गर्नेछन्।
            </p>
            <p>
              LINSNY का अध्यक्ष, वरिष्ठ उपाध्यक्ष, महासचिव र कोषाध्यक्षले LINSNYTFCC का पदेन सदस्यहरूको रूपमा सेवा गर्नेछन्। LINSNYTFCC ले ट्रस्टी व्यवस्थापन बोर्डमा यी LINSNY अधिकारीहरूको पदेन स्थिति ट्रस्टीको उपनियमहरूमा संरक्षित गरिएको सुनिश्चित गर्नुपर्छ।
            </p>
            <p>
              थप रूपमा, ट्रस्टी गठन गर्दा, LINSNYTFCC ले ट्रस्टीलाई सबै परिस्थितिहरूमा LINSNY को सम्पत्तिको सुरक्षा गर्न पर्याप्त अधिकार छ भनी सुनिश्चित गर्नेछ।
            </p>
          </div>

          {/* Signature */}
          <div className="mt-6 flex justify-end">
            <p className="font-serif text-gray-700 dark:text-gray-300 italic">- LINS-NY</p>
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
