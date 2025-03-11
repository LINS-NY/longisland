import React from 'react';
import Image from 'next/image';

const NepaliCalendar = () => {
  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        height: '100vh', // Full viewport height
        backgroundColor: '#f0f0f0', // Optional: Add a background color
        padding: '20px', // Add some padding
      }}>
      <iframe
      src="https://nepalicalendar.rat32.com/clockwidget/nepali-clock-widget-horizontal-green.php"
      frameBorder="0"
      scrolling="no"
      marginWidth="0"
      marginHeight="0"
      style={{ border: 'none', overflow: 'hidden', width: '350px', height: '121px' }}
      allowTransparency="true"
    ></iframe>
    
    {/* TO DO Deepak: Make this center of the screen in Laptops */}
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
          height: '800px',
          borderRadius: '5px',
          padding: '0px',
          margin: '0px'
        }}
        allowTransparency="true"
        title="Nepali Calendar"
      ></iframe>
    </div>  


      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '5px',
          backgroundColor: '#ccc',
          margin: '20px 0',
        }}
      ></div>

      {/* LINS Events Heading */}
      <h1
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        LINS EVENTS
      </h1>

      {/* Divider */}
      <div
        style={{
          width: '100%',
          height: '5px',
          backgroundColor: '#ccc',
          margin: '20px 0',
        }}
      ></div>

      {/* LINS Events Image */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      ></div>

      {/* Image of the Events */}
      <Image
          src="/CalendarLINSEvents/LINSEVENTS2024.jpg" // Path to the image in the public folder
          alt="LINS Yearly Calendar 2025 Events"
          width={100} // Desired width of the image
          height={100} // Desired height of the image
          layout="responsive" // Adjusts the image size based on the container
        />
    </div>
  );
};

export default NepaliCalendar;