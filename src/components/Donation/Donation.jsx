"use client";

import { useState } from "react";
import Image from "next/image";
import banner from "/public/banner.png"; // Place your uploaded image in /public folder

const DonatePage = () => {
  const [formData, setFormData] = useState({
    member: "",
    resident: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    contactEmail: "",
    contactMethod: "",
    address: "",
    state: "",
    zip: "",
    amount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formUrl = "https://script.google.com/macros/s/AKfycbw1BhqxAj2gsq7cAI_pzPQypnPVNUkeEo74WSPdnsLvpy-8qq9hZXry6XPWJF794Q/exec";

    try {
      const queryParams = new URLSearchParams(formData).toString();
      const fullUrl = `${formUrl}?${queryParams}`;

      await fetch(fullUrl, {
        method: "GET",
        mode: "no-cors"
      });

      alert("Thank you for your donation!");
      // ✅ Clear the form
  setFormData({
    member: "",
    resident: "",
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    contactEmail: "",
    contactMethod: "",
    address: "",
    state: "",
    zip: "",
    amount: ""
  });

    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-700 text-white p-6 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full max-w-4xl mb-6">
        <Image
          src={banner}
          alt="LINS-NY Banner"
          className="rounded-lg shadow-xl w-full"
        />
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">LINS-NY Donation Form</h1>
        <p className="text-lg opacity-90">
          Please fill out this form to complete your donation.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-8"
      >
        {/* Membership Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Are you a current member of LINS-NY? *
            </label>
            <select
              name="member"
              required
              value={formData.member}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              If not a member, are you a NY resident?
            </label>
            <select
              name="resident"
              value={formData.resident}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Personal Info */}
        <hr className="my-6 border-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Number */}
          <div className="relative">
            <label className="block mb-2 font-medium text-gray-700">
              Phone Number *
              <span className="ml-1 text-gray-400 cursor-help" title="Enter a 10-digit number (e.g., 1234567890)">📞</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              required
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number. No dash or space."
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <label className="block mb-2 font-medium text-gray-700">
              Email Address *
              <span className="ml-1 text-gray-400 cursor-help" title="We'll use this to send your receipt">📧</span>
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              required
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              title="Enter a valid email address"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Preferred Contact Method *
              <span className="ml-1 text-gray-400 cursor-help" title="How should we reach you if needed?">💬</span>
            </label>
            <select
              name="contactMethod"
              value={formData.contactMethod}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
            </select>
          </div>
        </div>

        {/* Address */}
        <hr className="my-6 border-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Street Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">State *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Zip Code *</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">💖 Donation Amount</h2>
          <label className="block mb-2 font-medium text-white">Enter donation amount ($$) *</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            required
            onChange={handleChange}
            className="w-full p-4 text-lg border rounded-md text-black"
          />
        </div>

        {/* Spinner */}
        {isSubmitting && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-600"></div>
            <span className="ml-3 text-purple-700 font-medium">Processing your donation...</span>
          </div>
        )}

        {/* Submit */}
        <button
    type="submit"
    className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition"
  >
    Submit Donation
  </button>
</form>
    </div>
  );
};

export default DonatePage;