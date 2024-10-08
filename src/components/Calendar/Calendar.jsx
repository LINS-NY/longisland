"use client";

import { useEffect, useState } from "react";
import styles from "./day.module.scss";
import NepaliDate from "nepali-date-converter";

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

// Utility function to convert Nepali numerals to English numerals
const nepaliToEnglishNumber = (nepaliStr) => {
  const nepaliNums = {
    "०": 0,
    "१": 1,
    "२": 2,
    "३": 3,
    "४": 4,
    "५": 5,
    "६": 6,
    "७": 7,
    "८": 8,
    "९": 9,
  };
  return nepaliStr.replace(/[०-९]/g, (match) => nepaliNums[match]);
};

function MonthView({ isNepali, date, monthInfo, currentYear, currentMonth }) {
  // Get today's Nepali date
  const nepaliToday = new NepaliDate(new Date());
  const todayNepaliYear = nepaliToday.getYear();
  const todayNepaliMonth = nepaliToday.getMonth() + 1; // Nepali months are 0-indexed
  const todayNepaliDate = nepaliToday.getDate();

  const daysInMonth = monthInfo.days.map((dayInfo) => ({
    day: nepaliDays[dayInfo.d - 1],
    nepali_date: dayInfo.n || null, // Ensure that empty values are handled as null
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
          // Convert Nepali date to English before comparison
          const nepaliDateInEnglish = dayInfo.nepali_date
            ? parseInt(nepaliToEnglishNumber(dayInfo.nepali_date), 10)
            : null;

          const isToday =
            nepaliDateInEnglish === todayNepaliDate &&
            currentMonth === todayNepaliMonth &&
            currentYear === todayNepaliYear;

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
              {dayInfo.nepali_date !== null && (
                <>
                  <div className={styles.dayName}>{dayInfo.day}</div>
                  <div className={styles.nepaliDate}>{dayInfo.nepali_date}</div>
                  <div className={styles.actions}>
                    <div className={styles.leftAction}>{dayInfo.tithi}</div>
                    <div className={styles.rightAction}>
                      {dayInfo.english_date}
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Calendar() {
  const [isNepali, setIsNepali] = useState(true);
  const [currentNepaliDate, setCurrentNepaliDate] = useState("");
  const [monthInfo, setMonthInfo] = useState({ days: [] });
  const [extraInformation, setExtraInformation] = useState({});
  const [currentYear, setCurrentYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);

  // Fetch the Nepali calendar for the current year and month
  useEffect(() => {
    async function fetchMyAPI(year, month) {
      try {
        const page = `/Calendar/Nepali/${year}/${month}.json`; // Ensure this path is correct
        const detail = await fetch(page).then((res) => res.json());
        setMonthInfo(detail);
        setExtraInformation(detail);
      } catch (error) {
        console.error("Error fetching Nepali date or month details:", error);
      }
    }

    if (isNepali && currentYear && currentMonth) {
      fetchMyAPI(currentYear, currentMonth);
    }
  }, [isNepali, currentYear, currentMonth]);

  // Set initial Nepali date when component mounts
  useEffect(() => {
    const nepaliDate = new NepaliDate(new Date());
    const year = nepaliDate.getYear();
    const nepMonth = nepaliDate.getMonth() + 1;
    const day = nepaliDate.getDate();

    setCurrentNepaliDate(`${year}-${nepMonth}-${day}`);
    setCurrentYear(year);
    setCurrentMonth(nepMonth);
  }, []);

  const handleNextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handlePreviousMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

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
          className={`text-sm md:text-3xl sd:text-sm font-semibold whitespace-nowrap text-gray-9500 dark:text-gray-900 ${styles.span1}`}
        >
          {extraInformation.metadata?.np || ""}
        </span>
      </div>

      {/* Add Next and Previous Buttons */}
      <div className="flex justify-between items-center w-full p-4">
        <button
          className="bg-blue-300 text-white px-4 py-2 rounded-md font-medium"
          onClick={handlePreviousMonth}
        >
          अघिल्लो महिना
        </button>

        <button
          className="bg-blue-300 text-white px-4 py-2 rounded-md font-medium"
          onClick={handleNextMonth}
        >
          अर्को महिना
        </button>
      </div>

      <div className="flex flex-row justify-between mx-auto p-4">
        <MonthView
          isNepali={isNepali}
          date={currentNepaliDate}
          monthInfo={monthInfo}
          currentYear={currentYear}
          currentMonth={currentMonth}
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
