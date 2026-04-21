import * as React from 'react';

import ElectedMember from './ElectedMember';

const electedMember = [
    {
        name: "Sabitra Siwakoti",
        nepaliName: "सावित्रा सिवाकोटी",
        imageLocation: "/Members/SabitraSiwakoti.png",
        position: "President",
        nepaliPostion: "अध्यक्ष"
    },
    {
        name: "Gokul Sapkota",
        nepaliName: "गोकुल सापकोटा",
        imageLocation: "/Members/GokulSapkota.png",
        position: "Senior Vice President",
        nepaliPostion: "वरिष्ठ उपाध्यक्ष"
    },
    {
        name: "Yam Raj Giri",
        nepaliName: "यम राज गिरी",
        imageLocation: "/Members/YamRajGiri.png",
        position: "Vice President (Nassau)",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "Gyanu Chand",
        nepaliName: "ज्ञानु चन्द",
        imageLocation: "/Members/GyanuChand.png",
        position: "Vice President (Suffolk)",
        nepaliPostion: "उपाध्यक्ष"
    },
    {
        name: "TBD",
        nepaliName: "TBD",
        imageLocation: "/Members/default.png",
        position: "Women Vice President",
        nepaliPostion: "महिला उपाध्यक्ष"
    },
    {
        name: "Bishal Regmi",
        nepaliName: "विशाल रेग्मी",
        imageLocation: "/Members/BishalRegmi.jpg",
        position: "General Secretary",
        nepaliPostion: "महासचिव"
    },
    {
        name: "Milan Chhetri",
        nepaliName: "मिलन क्षेत्री",
        imageLocation: "/Members/MilanChhetri.jpg",
        position: "Secretary",
        nepaliPostion: "सचिव"
    },
    {
        name: "Namita Poudel",
        nepaliName: "नमिता पौडेल",
        imageLocation: "/Members/NamitaPaudel.png",
        position: "Women Secretary",
        nepaliPostion: "महिला सचिव"
    },
    {
        name: "Purushottam Sapkota",
        nepaliName: "पुरुषोत्तम सापकोटा",
        imageLocation: "/Members/PurushottamSapkota.jpg",
        position: "Treasurer",
        nepaliPostion: "कोषाध्यक्ष"
    },
    {
        name: "Shushmita Pandit",
        nepaliName: "सुस्मिता पण्डित",
        imageLocation: "/Members/ShushmitaPandit.jpg",
        position: "Women Co-Treasurer",
        nepaliPostion: "महिला सह–कोषाध्यक्ष"
    },
    {
        name: " ",
        nepaliName: "मन्दीप प्रजापति",
        imageLocation: "/Members/MandipPrajapati.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Om Kumari Dahal (Ashika)",
        nepaliName: "ओम कुमारी दाहाल (आशिका)",
        imageLocation: "/Members/OmKumariDahal(Ashika).jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Prabhakar Pande",
        nepaliName: "प्रभाकर पाण्डे",
        imageLocation: "/Members/PrabhakarPande.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Pushpa Raj Regmi",
        nepaliName: "पुष्प राज रेग्मी",
        imageLocation: "/Members/PushpaRajRegmi.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Ramu Lamichhane",
        nepaliName: "रामू लामिछाने",
        imageLocation: "/Members/RamuLamichhane.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Surendra Bikram Basnet",
        nepaliName: "सुरेन्द्र विक्रम बस्नेत",
        imageLocation: "/Members/SurendraBikramBasnet.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    },
    {
        name: "Tulasi Kumari Paudel Timililsina",
        nepaliName: "तुलसी कुमारी पौडेल तिमिल्सिना",
        imageLocation: "/Members/TulasiPaudelTimalsina.jpg",
        position: "Board of Directors",
        nepaliPostion: "कार्यसमिति सदस्य"
    }
];

const ElectedMembers = () => {
    return(
        <div className=" bg-white flex flex-col">
            <div className="flex flex-col font-medium justify-center items-center text-sm">
                <span>2026-2028 Elected Members</span>
                <h6> २०२६ - २०२८ कार्यसमिति सदस्य</h6>
            </div>      
            <div className="md:grid md:grid-cols-4 md:gap-4 sm:mx-auto" >                                     
                {electedMember.map(function(object, i){
                    return <ElectedMember 
                        name={object["name"]} 
                        nepaliName={object["nepaliName"]} 
                        imageLocation={object["imageLocation"]} 
                        position={object["position"]}
                        nepaliPostion={object["nepaliPostion"]}
                        key={i} />;
                })}
             </div> 
    </div>
            
    )
}

export default ElectedMembers