"use client";

import { useEffect, useState } from "react";
import styles from "./day.module.scss";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const nepaliDays = [
  "आईतवार",
  "सोमवार",
  "मंगलवार",
  "बुधवार",
  "बिहीवार",
  "शुक्रवार",
  "शनिवार",
];
const NepaliMonths = [
  "बैशाख",
  "जेठ",
  "असार",
  "साउन",
  "भदौ",
  "असोज",
  "कार्तिक",
  "मंसिर",
  "पौष",
  "माघ",
  "फागुन",
  "चैत",
];
const currentDay = new Date();

function MonthView({ isNepali, currentNepaliDate, monthInfo }) {
  let daysInMonth = [];
  const today = new Date(); // Get today's date for highlighting
  let month = currentNepaliDate.split("-")[1];
  const day = currentNepaliDate.split("-")[2];

  //   if (isNepali) {
  const nepMonthIndex = currentNepaliDate.split("-")[1] - 1;
  month = NepaliMonths[nepMonthIndex];
  daysInMonth = monthInfo.days.map((dayInfo, index) => ({
    day: nepaliDays[dayInfo.d - 1],
    nepali_date: dayInfo.n || " ",
    english_date: dayInfo.e || " ",
    date: dayInfo.n || " ",
    events: dayInfo.f,
    holiday: dayInfo.h,
    tithi: dayInfo.t,
  }));

  console.log(daysInMonth);

  return (
    <div>
      <div className="grid grid-cols-7">
        {daysInMonth.map((dayInfo, index) => {
          const isToday =
            parseInt(dayInfo.english_date, 10) === today.getDate(); // Check if the current date matches

          return (
            <div
              key={index}
              className={`${styles.dayContainer} ${
                isToday ? styles.today : ""
              }`} // Add conditional styling
              style={{
                border: isToday ? "4px solid #FF6347" : "1px solid #ddd", // Highlight current day
                backgroundColor: isToday ? "#eee1c7" : "transparent",
                borderRadius: isToday ? "20px" : "0",
                padding: "10px",
              }}
            >
              {dayInfo.nepali_date !== " " && (
                <>
                  <div className={styles.dayName}>{dayInfo.day}</div>
                  <div className={styles.nepaliDate}>{dayInfo.nepali_date}</div>
                  <div className={styles.actions}>
                    <div className={styles.leftAction}>{dayInfo.tithi}</div>
                    <div className={styles.rightAction}>
                      {dayInfo.english_date}
                    </div>
                  </div>
                  {dayInfo.events && (
                    <div className={styles.event}>{dayInfo.events}</div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Switch = ({ nepali, changeNepali }) => {
  const handleSelect = () => {
    changeNepali(!nepali);
  };
  return (
    <div className="sm:w-5/6 flex flex-row-reverse">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          id="switch"
          type="checkbox"
          className="peer sr-only"
          value="off"
          onChange={handleSelect}
        />
        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
        <label htmlFor="switch" className="px-2 dark:text-black">
          Nepali
        </label>
      </label>
    </div>
  );
};

export default function Calendar() {
  const [isNepali, setIsNepali] = useState(true);
  const [currentNepaliDate, setCurrentNepaliDate] = useState("");
  const [monthInfo, setMonthInfo] = useState({ days: [] }); // Ensure days is an array
  const [extraInformation, setExtraInformation] = useState({}); // State for storing detail

  //   const [info, setExtraInformation] = useState({
  //     bratabandha : " ",
  //     holiFes,
  //     marriage,
  //     metadata,
  //   });
  useEffect(() => {
    async function fetchMyAPI() {
      try {
        let response = await fetch("https://nepali-datetime.amitgaru.me/date");

        const data = await response.json();
        setCurrentNepaliDate(data.data);
        const year = data.data.split("-")[0];
        const nepMonth = data.data.split("-")[1];
        const page = `./Calendar/Nepali/${year}/${nepMonth.replace(
          /^0+/,
          ""
        )}.json`;
        const detail = await fetch(page).then((res) => res.json());
        console.log(detail);
        // setExtraInformation(detail); // Store the whole detail object
        setMonthInfo(detail);
        setExtraInformation(detail);
      } catch (error) {
        console.error("Error fetching Nepali date or month details:", error);
      }
    }

    if (isNepali) {
      fetchMyAPI();
    }
  }, [isNepali]);

  return (
    <div className="bg-white flex flex-col">
      <div>
        <div className="flex flex-row justify-between mx-auto p-4">
          <span
            className={
              ("text-sm",
              "md:text-3xl",
              "font-semibold",
              "whitespace-nowrap",
              "text-gray-9500",
              "dark:text-gray-900",
              styles.span1)
            }
          >
            {extraInformation.metadata?.en || ""}
          </span>
          <span
            className={
              ("text-sm",
              "md:text-3xl",
              "font-extrabold",
              "whitespace-nowrap",
              "text-gray-500",
              "dark:text-gray-400",
              styles.span2)
            }
          >
            {extraInformation.metadata?.np || ""}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between mx-auto p-4">
        <MonthView
          isNepali={isNepali}
          currentNepaliDate={currentNepaliDate}
          monthInfo={monthInfo}
        />
      </div>

      <div className="flex flex-col mx-auto p-4 space-y-4">
        {/* Bratabandha Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            ब्रताबन्ध: {extraInformation.bratabandha}
          </span>
        </div>

        {/* Marriage Events Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            विवाह:{" "}
            {extraInformation.marriage &&
            extraInformation.marriage.length > 0 ? (
              extraInformation.marriage.map((event, index) => (
                <div key={index} className="mb-1">
                  {event}
                </div>
              ))
            ) : (
              <span>No marriage events available</span>
            )}
          </span>
        </div>

        {/* Important Dates Section */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            Important dates:{" "}
            {extraInformation.holiFest &&
            extraInformation.holiFest.length > 0 ? (
              extraInformation.holiFest.map((fest, index) => (
                <div key={index} className="mb-1">
                  {fest}
                </div>
              ))
            ) : (
              <span>No festivals available</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
