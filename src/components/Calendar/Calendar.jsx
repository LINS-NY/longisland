import React from 'react';
import Image from 'next/image';

const NepaliCalendar = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7fafc', // Light background color
        padding: '20px',
        gap: '40px', // Adds consistent spacing between components
      }}
    >
      {/* Clock Section */}
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#ffffff', // White background for the clock
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
        }}
      >
        <iframe
          src="https://nepalicalendar.rat32.com/clockwidget/nepali-clock-widget-horizontal-green.php"
          frameBorder="0"
          scrolling="no"
          marginWidth="0"
          marginHeight="0"
          style={{
            border: 'none',
            overflow: 'hidden',
            width: '350px',
            height: '121px',
          }}
          allowTransparency="true"
        ></iframe>
      </div>

      {/* Calendar Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#ffffff', // White background for the calendar
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
          padding: '20px',
        }}
      >
        <iframe
          src="https://nepalicalendar.rat32.com/embed.php"
          frameBorder="0"
          scrolling="no"
          marginWidth="0"
          marginHeight="0"
          style={{
            border: 'none',
            overflow: 'hidden',
            width: '100%',
            height: '450px', // Adjusted height for better visibility
            borderRadius: '10px',
          }}
          allowTransparency="true"
          title="Nepali Calendar"
        ></iframe>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '80%',
          height: '6px',
          backgroundColor: '#e2e8f0', // Light gray divider
          margin: '5px 0',
        }}
      ></div>

      {/* LINS Events Heading */}
      <h1
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#2d3748', // Dark gray color
          marginBottom: '5px',
        }}
      >
        LINS EVENTS
      </h1>

      {/* Divider */}
      <div
        style={{
          width: '80%',
          height: '6px',
          backgroundColor: '#e2e8f0', // Light gray divider
          margin: '5px 0',
        }}
      ></div>

      {/* Image Section */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#ffffff', // White background for the image
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
          overflow: 'hidden',
          padding: '20px',
        }}
      >
        <Image
          src="/CalendarLINSEvents/LINSEVENTS2024.jpg" // Path to the image in the public folder
          alt="LINS Yearly Calendar 2025 Events"
          width={800} // Desired width of the image
          height={600} // Desired height of the image
          layout="responsive" // Adjusts the image size based on the container
          style={{ borderRadius: '10px' }} // Rounded corners for the image
        />
      </div>
    </div>
  );
};

export default NepaliCalendar;