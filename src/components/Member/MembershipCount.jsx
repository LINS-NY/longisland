import React from "react";

const MembershipCount = ({ lifeMember, yearlyMember, all }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold whitespace-pre">
        Life Time Members: {lifeMember.length}
        <br />
        General Members: {yearlyMember.length}
        <br />
        <button className="bg-lime-400 hover:bg-lime-300 text-black font-medium md:font-bold md:py-2 md:px-4 border-b-4 my-1 border-blue-700 hover:border-red-500">
          Total Members: {all.length}
        </button>
      </h1>
    </div>
  );
};

export default MembershipCount;