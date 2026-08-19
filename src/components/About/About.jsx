'use client';

import React, { useState, useEffect } from 'react';
import ElectedMembers from '../About/ElectedMembers';
import { usePapaParse } from 'react-papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Image from 'next/image';
import nepaliContent from "./content/about-np.json";
import englishContent from "./content/about-en.json";



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
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${type === "Junior"
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
  const [lang, setLang] = useState("np"); 
  const content = lang === "np" ? nepaliContent : englishContent;


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
<section id="about" className="w-full bg-gray-50">
  <div className="max-w-5xl mx-auto px-6 py-12">

    {/* Language Toggle */}
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setLang("np")}
          className={`px-5 py-2 text-sm font-semibold ${
            lang === "np"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          नेपाली
        </button>

        <button
          onClick={() => setLang("en")}
          className={`px-5 py-2 text-sm font-semibold ${
            lang === "en"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          English
        </button>
      </div>
    </div>

    {/* Title */}
    <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-8">
      {content.title}
    </h1>

    {/* Article */}
    <article className="max-w-4xl mx-auto">
      <div
        className={`font-serif text-gray-800 text-base md:text-lg leading-relaxed ${
          !expanded ? "max-h-[15rem]" : "max-h-none"
        } overflow-hidden transition-all duration-300`}
      >
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-5 text-justify">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Continue Reading */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-6 py-3 rounded-full bg-blue-100 text-blue-800
                     hover:bg-blue-200 transition-all shadow-sm"
        >
          {expanded ? "Show Less" : "...Continue Reading"}
        </button>
      </div>

      {/* Back to Top */}
      <div className="flex justify-end mt-10">
        <a
          href="#top"
          className="text-blue-700 text-lg hover:text-blue-900"
        >
          ↑ Back to Top
        </a>
      </div>
    </article>

  </div>
</section>


      {/* Executives */}
      <section id="executives" className="bg-white py-12">
        <ElectedMembers />
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
        <div className="text-center mt-6">
          <a
            href="#about"
            className="text-bold text-2xl text-blue-800 hover:text-blue-600 transition inline-flex items-center gap-1"
          >
            <span className="text-lg">↑</span> Back to Top
          </a>
        </div>
      </section>

      {/* Developers */}
      <div>
        <br />
        <div className="flex-grow h-px bg-gray-400 py-0.5"></div>
        <div className="flex justify-center font-extrabold font-serif text-5xl py-0.5">Developers</div>

        <div className="flex items-center py-4">
          <div className="flex-grow h-px bg-gray-400 py-0.5"></div>
        </div>

        <div className="grid grid-cols-3 px-8 place-items-center">
          <Image src="/BijendraBasnet.jpg" width={130} height={130} alt="BijendraBasnet" />
          <Image src="/DeepakAdhikari.jpg" width={87} height={95} alt="DeepakAdhikari" />
          <Image src="/Bikash Mainali.jpg" width={97} height={95} alt="Bikash Mainali" />

          <p className="text-center sm:font-extrabold xl:text-2xl text-blue-950">
            Bijendra <br /> Basnet
          </p>
          <p className="text-center sm:font-bold xl:text-2xl text-blue-950">
            Deepak <br /> Adhikari
          </p>
          <p className="text-center sm:font-bold xl:text-2xl text-blue-950">
            Bikash <br /> Mainali
          </p>
        </div>
      </div>

    </div>
  );
}


export default About;
