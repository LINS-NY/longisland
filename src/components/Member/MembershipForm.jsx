"use client";

import { useState } from "react";
import Image from "next/image";
import banner from "/public/banner.png"; // Replace with your banner image

const MembershipPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    contactMethod: "",
    membershipType: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycby4B-jcKg19fZRP0GbzVtnKWC13L7YYtqVUOyJRZeHwaaY2kIdIV95WH0ZXVLuIjPjS/exec";

    const formBody = new URLSearchParams(formData);

    try {
      await fetch(scriptURL, {
        method: "POST",
        body: formBody,
        mode: "no-cors",
      });

      alert("✅ Membership form submitted successfully!");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        contactMethod: "",
        membershipType: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-teal-600 to-blue-700 text-white p-6 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full max-w-4xl mb-6">
        <Image src={banner} alt="LINS-NY Banner" className="rounded-lg shadow-xl w-full" />
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">LINS-NY Membership Form</h1>
        <p className="text-lg opacity-90">Join our community by filling out this form.</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-3xl space-y-8"
      >
        {/* Name Fields */}
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

        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label className="block mb-2 font-medium text-gray-700">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div>
            <label className="block mb-2 font-medium text-gray-700">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              required
              pattern="[0-9]{10}"
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Preferred Contact Method *</label>
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

        {/* Membership Type */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">💳 Membership Type</h2>
          <label className="block mb-2 font-medium text-white">Select your membership *</label>
          <select
            name="membershipType"
            value={formData.membershipType}
            required
            onChange={handleChange}
            className="w-full p-4 text-lg border rounded-md text-black"
          >
            <option value="">Select</option>
            <option value="General Member ($10)">General Member ($10)</option>
            <option value="Lifetime Member ($100)">Lifetime Member ($100)</option>
          </select>
        </div>

        {/* Spinner */}
        {isSubmitting && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-600"></div>
            <span className="ml-3 text-green-700 font-medium">Submitting...</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition"
        >
          Submit Membership
        </button>
      </form>
    </div>
  );
};

export default MembershipPage;
