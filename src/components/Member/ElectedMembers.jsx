import * as React from 'react';

import ElectedMember from './ElectedMember';

const electedMember = [
    {
        name: "Kul Prasad Gouli (Rajan)",
        nepaliName: "कुल प्रसाद गौली (राजन)",
        imageLocation: "/Members/RajanGouli.png",
        position: "President",
        nepaliPostion: "अघ्यक्ष"
    },
    {
        name: "Sabitra Siwakoti",
        nepaliName: "सावित्रा सिवाकोटी",
        imageLocation: "/Members/SabitraSiwakoti.png",
        position: "Senior Vice President",
        nepaliPostion: "बरिस्ठ उपाध्यक्ष"
    },
    {
        name: "Gokul Sapkota",
        nepaliName: "गोकुल सापकोटा",
        imageLocation: "/Members/GokulSapkota.png",
        position: "Vice President",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "Indira Simkhada",
        nepaliName: "इन्दिरा सिंखडा (पाण्डे)",
        imageLocation: "/Members/IndiraSimkhada.png",
        position: "Vice President",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "Rajendra Kumar Karki",
        nepaliName: "राजेन्द्र कुमार कार्की",
        imageLocation: "/Members/RAJENDRAKUMARKARKI.png",
        position: "General Secretary",
        nepaliPostion: "महासचिव"
    },
    {
        name: "Deepak Adhikari",
        nepaliName: "दिपक अधिकारी",
        imageLocation: "/Members/DeepakAdhikari.png",
        position: "Secretary",
        nepaliPostion: "सचिव"
    },
    {
        name: "Mohan Chettry",
        nepaliName: "मोहन क्षेत्री",
        imageLocation: "/Members/MohanChettry.png",
        position: "Secretary",
        nepaliPostion: "सचिव"
    },
    {
        name: "Nirmal Thapaliya",
        nepaliName: "निर्मल थपलिया",
        imageLocation: "/Members/NirmalThapaliya.png",
        position: "Treasurer",
        nepaliPostion: "कोषाध्यक्ष"
    },
    {
        name: "Ram Kumar Rai",
        nepaliName: "राम कुमार राई",
        imageLocation: "/Members/RamKumarRai.png",
        position: "Co-Treasurer",
        nepaliPostion: "सह कोषाध्यक्ष"
    },
    {
        name: "Ambika Phuyal",
        nepaliName: "अम्बिका फुँयाल",
        imageLocation: "/Members/AmbikaPhuyal.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Bikash Mainali",
        nepaliName: "विकास मैनाली",
        imageLocation: "/Members/BIkashMainali.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Bimala Bhandari",
        nepaliName: "विमला भण्डारी",
        imageLocation: "/Members/BimalaBhandari.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Dr.Yam Raj Giri",
        nepaliName: "डा. यम राज गिरी",
        imageLocation: "/Members/YamRajGiri.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Gyanu Chand",
        nepaliName: "ज्ञानु चन्द",
        imageLocation: "/Members/GyanuChand.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Ravi Khadka",
        nepaliName: "रवि खड्का",
        imageLocation: "/Members/RaviKhadka.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Raj kumar Tamang",
        nepaliName: "राज कुमार तामांग",
        imageLocation: "/Members/RajKumarTamang.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Roshni Sitaula",
        nepaliName: "रोश्नी सिटौला",
        imageLocation: "/Members/RoshniSitaula.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Sujan Regmi",
        nepaliName: "सुजन रेग्मी",
        imageLocation: "/Members/SujanRegmi.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Namita Paudel",
        nepaliName: "नमिता पौडेल",
        imageLocation: "/Members/NamitaPaudel.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Niraj Sapkota",
        nepaliName: "निरज सापकोटा",
        imageLocation: "/Members/NirajSapkota.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Suman Bastola",
        nepaliName: "सुमन बास्तोला",
        imageLocation: "/Members/SumanBastola.png",
        position: "Board Of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
]

const ElectedMemberCard = ({ name, nepaliName, imageLocation, position, nepaliPostion }) => (
  <div className="bg-white/60 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 p-4 flex flex-col items-center text-center">
    <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-blue-400 shadow-sm">
      <img
        src={imageLocation}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=blue&color=white&size=128`;
        }}
      />
    </div>
    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-600">{nepaliName}</p>
    <div className="mt-2">
      <p className="text-sm font-semibold text-blue-700">{position}</p>
      <p className="text-xs text-gray-500">{nepaliPostion}</p>
    </div>
  </div>
);

const ElectedMembers = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-900">Executive Members (2024–2025)</h2>
          <p className="text-lg text-gray-700 mt-2">२०२४ - २०२५ कार्यसमिति सदस्य</p>
          <div className="mt-4 w-24 h-1 mx-auto bg-blue-500 rounded-full" />
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {electedMember.map((member, i) => (
            <ElectedMemberCard
              key={i}
              name={member.name}
              nepaliName={member.nepaliName}
              imageLocation={member.imageLocation}
              position={member.position}
              nepaliPostion={member.nepaliPostion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectedMembers;