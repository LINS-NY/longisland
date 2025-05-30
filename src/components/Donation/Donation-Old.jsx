'use client';
import React, { useState } from 'react';

// List of all 50 states
const statesList = [
  "New York", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
  "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
  "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const Donation = () => {
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  // Function to handle ZIP code auto-population
  const handleZipChange = (e) => {
    const zipCode = e.target.value;
    setZip(zipCode);

    if (zipCode.length === 5) { // Ensure it's a 5-digit zip code
      // Fetch city/state from the API using the zip code
      fetch(`http://api.zippopotam.us/us/${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          const city = data.places[0]['place name'];
          const state = data.places[0]['state abbreviation'];
          setCity(city);
          setState(state);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setCity('');
          setState('');
        });
    } else {
      // Reset city and state if zip code is incomplete or invalid
      setCity('');
      setState('');
    }
  };

  // Function to handle the donation submission
  const handleDonate = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!validatePhone(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    // Validate donation amount
    if (!validateDonationAmount(donationAmount)) {
      alert('Please enter a valid donation amount (greater than 0).');
      return;
    }

    // Prepare the data to send to the server
    const donationData = {
      firstName,
      middleInitial,
      lastName,
      donationAmount,
      email,
      phone, // Include phone number in the donation data
      streetAddress,
      city,
      state,
      zip
    };

    // Send the donation data to the server to save it in Excel
    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your donation!');
        console.log('Donation data saved successfully');
      } else {
        alert('Failed to save donation');
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error during donation submission:', error);
      alert('An error occurred while submitting your donation');
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Validate phone number format
  const validatePhone = (phone) => {
    const regex = /^\d{10}$/; // Matches exactly 10 digits
    return regex.test(phone);
  };

  // Validate donation amount
  const validateDonationAmount = (amount) => {
    return !isNaN(amount) && parseFloat(amount) > 0;
  };

  // Function to handle email change and validate
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsValidEmail(validateEmail(emailValue));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Make a Donation</h2>
      <form onSubmit={handleDonate} className="space-y-4">
        {/* Form fields for donation details */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">First Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Middle Initial</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={middleInitial}
              onChange={(e) => setMiddleInitial(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email, Phone, and Donation Amount Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Donation Amount ($$)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Please Enter Your Gmail Email Address</label>
            <div className="relative">
              <input
                type="email"
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 `}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {!isValidEmail && <p className="text-red-500 text-xs">Please enter a valid email address</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Street Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">State</label>
              <select
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              >
                {statesList.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Zip Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                value={zip}
                onChange={handleZipChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Donate Button */}
        <div className="flex justify-center mt-6 ">
          <button
            type="submit"
            className={`py-2 px-6 rounded-full font-bold text-base transition duration-300 bg-sky-800 text-white hover:bg-sky-900`}
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Donation;