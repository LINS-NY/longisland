import React from "react";

const MembershipTable = ({ displayMember, membership, popup, handleClick, handleSelection, selected }) => {
  return (
    <div className="lg:px-2 px-1 lg:py-6 shadow-lg shadow-cyan-500/50">
      <div className="overflow-hidden">
        <table className="w-full text-center text-sm font-light dark:text-white border-collapse">
          <thead className="shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 bg-sky-500/100 rounded-3xl">
            <tr className="rounded-3xl">
              <th scope="col" className="font-bold md:px-6 px-1 py-1 md:py-4">
                Member Name
              </th>
              <th scope="col" className="font-bold md:px-6 px-1 py-1 md:py-4">
                Membership Expiration Date
              </th>
              <th scope="col" className="font-bold md:px-6 px-1 py-1 md:py-4">
                <label
                  id="listbox-label"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Membership Type
                </label>
                <div className="relative mt-2">
                  <button
                    type="button"
                    className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={handleClick}
                  >
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">{membership}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  {popup && (
                    <ul
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      tabIndex="-1"
                      role="listbox"
                      aria-labelledby="listbox-label"
                      aria-activedescendant="listbox-option-3"
                    >
                      {["Life Time", "Yearly", "All"].map((type) => (
                        <li
                          key={type}
                          className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9"
                          onClick={handleSelection}
                          id={`listbox-option-${type}`}
                          role="option"
                        >
                          <div className="flex items-center">
                            <span className="font-normal ml-3 block truncate">{type}</span>
                          </div>
                          {selected === type && (
                            <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{displayMember}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipTable;