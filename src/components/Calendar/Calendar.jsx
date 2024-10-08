"use client";

import { useEffect, useState } from "react";
import styles from "./day.module.scss";
import NepaliDate from "nepali-date-converter";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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

function MonthView({ isNepali, date, monthInfo }) {
  let daysInMonth = [];
  const today = new Date(); // Get today's date for highlighting

  const [year, month, day] = date.split("-");
  console.log(year, month, day);
  if (isNepali) {
    const nepMonthIndex = month - 1; // Adjusting for 0-based indexing
    const nepMonthName = NepaliMonths[nepMonthIndex];
    daysInMonth = monthInfo.days.map((dayInfo, index) => ({
      day: nepaliDays[dayInfo.d - 1],
      nepali_date: dayInfo.n || " ",
      english_date: dayInfo.e || " ",
      date: dayInfo.n || " ",
      events: dayInfo.f,
      holiday: dayInfo.h,
      tithi: dayInfo.t,
    }));

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
                }`}
                style={{
                  border: isToday ? "4px solid #FF6347" : "1px solid #ddd",
                  backgroundColor: isToday ? "#e6d2ab" : "",
                  borderRadius: isToday ? "5px" : "0",
                  padding: "10px",
                }}
              >
                {dayInfo.nepali_date !== " " && (
                  <>
                    <div className={styles.dayName}>{dayInfo.day}</div>
                    <div className={styles.nepaliDate}>
                      {dayInfo.nepali_date}
                    </div>
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
}

export default function Calendar() {
  const [isNepali, setIsNepali] = useState(true);
  const [currentNepaliDate, setCurrentNepaliDate] = useState("");
  const [monthInfo, setMonthInfo] = useState({ days: [] });
  const [extraInformation, setExtraInformation] = useState({});

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        const nepaliDate = new NepaliDate(new Date()); // Pass today's date in AD
        console.log("Nepali Date: ", nepaliDate);

        // To access the year, month, and day
        const year = nepaliDate.getYear();
        const nepMonth = nepaliDate.getMonth() + 1;
        const day = nepaliDate.getDate(); // Using getDate for actual date
        console.log(`Nepali Date: ${year}-${nepMonth}-${day}`);

        setCurrentNepaliDate(`${year}-${nepMonth}-${day}`);
        const page = `/Calendar/Nepali/${year}/${nepMonth}.json`; // Ensure this path is correct

        const detail = await fetch(page).then((res) => res.json());
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

  // Show loading if monthInfo is empty
  if (monthInfo.days.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <img
          src="/loading.gif"
          alt="Loading..."
          className={styles.loadingGif}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.container}`}>
      <div className="flex flex-row justify-between items-center w-full p-4">
        <span
          className={`text-sm md:text-3xl sd:text-sm font-semibold whitespace-nowrap text-gray-9500 dark:text-gray-900 ${styles.span1}`}
        >
          {extraInformation.metadata?.en || ""}
        </span>
        <span
          className={`text-sm md:text-3xl font-extrabold whitespace-nowrap text-gray-500 dark:text-gray-400 ${styles.span2}`}
        >
          {extraInformation.metadata?.np || ""}
        </span>
      </div>

      <div className="flex flex-row justify-between mx-auto p-4">
        <MonthView
          isNepali={isNepali}
          date={currentNepaliDate}
          monthInfo={monthInfo}
        />
      </div>

      <div className="flex flex-col mx-auto p-4 space-y-4">
        {/* Additional Sections */}
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            ब्रताबन्ध : {extraInformation.bratabandha}
          </span>
        </div>

        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            विवाह :
            {extraInformation.marriage?.length > 0 ? (
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

        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <span className="text-md md:text-xl font-semibold text-gray-700">
            महत्त्वपूर्ण मितिहरू :
            {extraInformation.holiFest?.length > 0 ? (
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
