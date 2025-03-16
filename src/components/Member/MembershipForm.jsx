"use client";

import React, { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import LifeTimeMember from "./LifeTimeMember";
import GeneralMember from "./GeneralMember";
import MembershipCount from "./MembershipCount";
import MembershipTable from "./MembershipTable";

const HomePage = () => {
  return (
    <div>
      {/* Render the Membership Form at the top */}
      <MembershipFormPage />

      {/* Render the Members List at the bottom */}
      <Member />
    </div>
  );
};

const MembershipFormPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-6">
      <div className="max-w-3xl text-center mb-10">
        <h1 className="text-5xl font-bold mb-6 text-shadow-lg">
          Become a LINS Member
        </h1>
        <p className="text-xl opacity-90 leading-relaxed">
          Thank You for Your Interest in Joining Long Island Nepalese Society!
        </p>
        <p className="text-xl opacity-90 leading-relaxed">
          Please fill out the form below to become a Member.
        </p>
      </div>

      {/* Google Form Embed */}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScBvtALULxVns8zdsn0ng6_x1vj_nKorp1ua37U0hud8NgJAg/viewform?embedded=true"
        width="100%"
        height="2398"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        className="w-full max-w-4xl rounded-lg shadow-2xl bg-white"
      >
        Loading…
      </iframe>
    </div>
  );
};

const Member = () => {
  const [lifeMember, setLifeMember] = useState([]);
  const [yearlyMember, setYearlyMember] = useState([]);
  const [all, setAll] = useState([]);
  const [displayMember, setDisplayMember] = useState([]);
  const [membership, setMembership] = useState("All");
  const [popup, setPopup] = useState(false);
  const [selected, setSelected] = useState(membership);
  const { readString } = usePapaParse();

  useEffect(() => {
    fetch("./AllMembers.csv")
      .then((response) => response.text())
      .then((csvText) => {
        readString(csvText, {
          worker: true,
          complete: (results) => {
            const lifeTimeMember = [];
            const regularMember = [];
            results.data.forEach((row, index) => {
              if (row[1] === "") {
                lifeTimeMember.push(
                  <LifeTimeMember
                    name={row[0]}
                    key={`${index}_${row[0]}`}
                    id={index + 1}
                  />
                );
              } else if (row[0] === "") {
                return;
              } else {
                regularMember.push(
                  <GeneralMember
                    key={`${index}_${row[0]}`}
                    name={row[0]}
                    expiration={row[1]}
                    id={index + 1}
                  />
                );
              }
            });
            setDisplayMember([...lifeTimeMember, ...regularMember]);
            setLifeMember(lifeTimeMember);
            setYearlyMember(regularMember);
            setAll([...lifeTimeMember, ...regularMember]);
          },
        });
      });
  }, [readString]);

  const handleClick = () => {
    setPopup(!popup);
  };

  const handleSelection = (e) => {
    const value = e.target.innerText.trim();
    setPopup(false);
    setMembership(value);
    setSelected(value);
    if (value === "Life Time") {
      setDisplayMember(lifeMember);
    } else if (value === "All") {
      setDisplayMember(all);
    } else {
      setDisplayMember(yearlyMember);
    }
  };

  return (
    <div className="bg-white flex flex-col">
      <div className="w-96 sm:w-5/6 justify-center mx-auto">
        <h4 className="font-bold text-center text-md lg:text-2xl bg-white mx-auto py-2">
          Long Island Nepalese Society - New York
        </h4>
        <h4 className="font-bold text-center text-md lg:text-2xl bg-white mx-auto py-2">
          Registered Membership List
        </h4>

        {/* Use the MembershipCount component */}
        <MembershipCount
          lifeMember={lifeMember}
          yearlyMember={yearlyMember}
          all={all}
        />

        {/* Use the MembershipTable component */}
        <MembershipTable
          displayMember={displayMember}
          membership={membership}
          popup={popup}
          handleClick={handleClick}
          handleSelection={handleSelection}
          selected={selected}
        />
      </div>
    </div>
  );
};

export default HomePage;