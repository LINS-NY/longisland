'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEmail, MdPhone } from 'react-icons/md'; // Import icons from react-icons
import Phone from './PhoneInfo';

// Styled component for the buttons
const StyledButton = styled.button`
  padding: 8px 16px; /* Smaller padding */
  color: white; /* White text color */
  font-size: 14px; /* Smaller font size */
  font-weight: 500;
  transition: all 0.3s ease; /* Smooth transition for all properties */
  border-radius: 6px; /* Slightly rounded corners */
  background: linear-gradient(135deg, #007BFF, #00BFFF); /* Gradient background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border: none; /* Remove default button border */
  cursor: pointer; /* Pointer cursor on hover */
  display: inline-block; /* Ensure the button behaves like a block element */

  &:hover {
    background: linear-gradient(135deg, #005bb5, #0099CC); /* Darker gradient on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Slightly larger shadow on hover */
    transform: translateY(-1px); /* Slight lift effect on hover */
  }

  &:active {
    transform: translateY(0); /* Reset lift effect when clicked */
  }
`;

// Styled component for the dropdown options
const DropdownOption = styled.div`
  padding: 8px 16px; /* Smaller padding */
  cursor: pointer;
  color: white; /* White text color */
  font-size: 14px; /* Smaller font size */
  font-weight: 500;
  transition: all 0.3s ease; /* Smooth transition for all properties */
  border-radius: 6px; /* Slightly rounded corners */
  background: linear-gradient(135deg, #007BFF, #00BFFF); /* Gradient background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin: 4px 0; /* Add margin between options */
  text-align: center; /* Center the text */
  display: flex; /* Use flexbox for icon alignment */
  align-items: center; /* Center items vertically */
  gap: 8px; /* Add space between icon and text */

  &:hover {
    background: linear-gradient(135deg, #005bb5, #0099CC); /* Darker gradient on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* Slightly larger shadow on hover */
    transform: translateY(-1px); /* Slight lift effect on hover */
  }

  &:active {
    transform: translateY(0); /* Reset lift effect when clicked */
  }
`;

const ContactUsButton = () => {
    const [showOptions, setShowOptions] = useState(false);

    const handleEmailClick = () => {
        window.location.href = 'mailto:lognislandnepalese@gmail.com';
    };

    const handleCallClick = () => {
        window.location.href = 'tel:+8567768105';
    };

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px', /* Smaller padding for the container */
            backgroundColor: '#f0f2f5', /* Light background for the container */
            borderRadius: '8px', /* Rounded corners for the container */
            width: 'fit-content', /* Make the container fit the button size */
            margin: '0 auto', /* Center the container horizontally */
        }}>
            <div style={{ 
                position: 'relative', 
                display: 'inline-block',
            }}>
                <StyledButton
                    onClick={() => setShowOptions(!showOptions)}
                >
                    Contact Us
                </StyledButton>

                {showOptions && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '110%', /* Slightly below the button */
                            left: '50%',
                            transform: 'translateX(-50%)', /* Center horizontally */
                            marginTop: '8px',
                            backgroundColor: 'white',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            zIndex: 1000,
                            minWidth: '160px', /* Ensure consistent width */
                            padding: '8px', /* Add padding inside the dropdown */
                        }}
                    >
                        <DropdownOption onClick={handleEmailClick}>
                            <MdEmail size={16} /> {/* Email icon */}
                            Send Email
                        </DropdownOption>
                        <DropdownOption onClick={handleCallClick}>
                            <MdPhone size={16} /> {/* Phone icon */}
                            <Phone />
                        </DropdownOption>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUsButton;