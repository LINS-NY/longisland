// app/Forums/Create/page.jsx
'use client';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * CreatePostPage — inputs visible in all browser modes (including Edge forced dark)
 *
 * What I changed to ensure inputs are visible in dark mode:
 * - Every <input>, <select>, and <textarea> uses explicit classes: bg-white text-black placeholder-gray-500
 * - Also added inline style { WebkitTextFillColor: '#111827' } to guard against some browsers' forced dark-mode text recolor
 * - Kept focus/tailwind ring styles for accessibility
 *
 * Paste this file over your existing CreatePostPage (app/Forums/Create/page.jsx).
 */

export default function CreatePostPage() {
  const router = useRouter();
  const [user] = useAuthState(auth);

  // Form state
  const [section, setSection] = useState('room');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Room
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [rent, setRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [rentNegotiable, setRentNegotiable] = useState(false);

  // Property
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [floor, setFloor] = useState('');
  const [area, setArea] = useState('');
  const [roomType, setRoomType] = useState('Private room');
  const [accommodates, setAccommodates] = useState('');
  const [accommodationType, setAccommodationType] = useState('Furnished');
  const [availableFrom, setAvailableFrom] = useState('');
  const [leaseTerm, setLeaseTerm] = useState('6+ months');
  const [utilitiesIncluded, setUtilitiesIncluded] = useState('yes');
  const [utilitiesCost, setUtilitiesCost] = useState('');

  // Jobs
  const [jobContactPerson, setJobContactPerson] = useState('');
  const [jobAddress, setJobAddress] = useState('');

  // Contact
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('email');
  const [phone, setPhone] = useState('');

  // UI
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user?.email]);

  // Basic validators
  const isZipValid = useMemo(() => /^\d{5}$/.test(zip), [zip]);
  const isEmailValid = useMemo(
    () =>
      typeof email === 'string' &&
      email.trim().length > 3 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    [email]
  );

  // Required checks (kept minimal for brevity)
  const requiredChecks = useMemo(() => {
    const errs = [];
    if (!description.trim() || description.trim().length < 3) errs.push('description');

    if (section === 'room') {
      if (!title.trim()) errs.push('title');
      if (!fullName.trim()) errs.push('fullName');
      if (!street.trim()) errs.push('street');
      if (!city.trim()) errs.push('city');
      if (!isZipValid) errs.push('zip');
      if (!rent.trim()) errs.push('rent');
      if (!isEmailValid) errs.push('email');
    } else if (section === 'jobs') {
      if (!title.trim()) errs.push('title');
      if (!jobContactPerson.trim()) errs.push('jobContactPerson');
      if (!isEmailValid) errs.push('email');
    } else if (section === 'general') {
      if (!isEmailValid) errs.push('email');
    }

    return { isValid: errs.length === 0, missing: errs };
  }, [
    section,
    title,
    description,
    fullName,
    street,
    city,
    zip,
    rent,
    email,
    jobContactPerson,
    jobAddress,
    isZipValid,
    isEmailValid
  ]);

  // Inline style to guard against forced dark-mode recolor in some browsers (Edge)
  const inputStyle = { WebkitTextFillColor: '#111827' }; // dark slate-900

  // A small helper to build consistent input className (applied to every input/select/textarea)
  const baseInputClass =
    'w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black placeholder-gray-500';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!user) {
      setSubmitError('You must be logged in to create a post.');
      return;
    }
    if (!requiredChecks.isValid) {
      setSubmitError('Please complete all required fields.');
      return;
    }

    setLoading(true);
    try {
      const base = {
        section,
        title: title.trim() || null,
        description: description.trim(),
        contact: { email: email.trim(), phone: phone.trim() || null, preferred: preferredContact },
        creatorUid: user.uid || null,
        creatorEmail: user.email || null,
        createdAt: serverTimestamp(),
        replies: 0
      };

      let payload = { ...base };

      if (section === 'room') {
        const rentalAddressObj = { street: street.trim(), city: city.trim(), zip: zip.trim() };
        const rentalAddressText = [rentalAddressObj.street, rentalAddressObj.city, rentalAddressObj.zip]
          .filter(Boolean)
          .join(', ');

        payload = {
          ...payload,
          fullName: fullName.trim(),
          rentalAddress: rentalAddressObj,
          rentalAddressText,
          rent: { amount: rent.trim() ? parseFloat(rent.trim()) : null, negotiable: !!rentNegotiable },
          deposit: deposit.trim() ? parseFloat(deposit.trim()) : null,
          property: {
            bedrooms: bedrooms.trim() || null,
            bathrooms: bathrooms.trim() || null,
            floor: floor.trim() || null,
            area: area.trim() || null,
            roomType: roomType || null,
            accommodates: accommodates.trim() || null,
            accommodationType: accommodationType || null,
            availableFrom: availableFrom || null,
            leaseTerm: leaseTerm || null,
            utilitiesIncluded: utilitiesIncluded === 'yes',
            utilitiesCost: utilitiesIncluded === 'no' ? (utilitiesCost.trim() ? utilitiesCost.trim() : null) : null
          }
        };
      } else if (section === 'jobs') {
        payload = { ...payload, contactPerson: jobContactPerson.trim(), jobAddress: jobAddress.trim() || null };
      }

      await addDoc(collection(db, 'Forum'), payload);
      router.push(`/Forums/user/${encodeURIComponent(user.email)}`);
    } catch (err) {
      console.error('Create post error:', err);
      setSubmitError('Submission failed — try again.');
      setLoading(false);
    }
  };

  // Small label helper
  const FieldLabel = ({ children }) => <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-50 py-10">
      <Header />
      <main className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-blue-800">Create Post</h1>
            <Link href="/Forums" className="text-sm text-blue-600 hover:underline">
              ← Back to Forum
            </Link>
          </div>

          <div className="mt-3">
            {user ? (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-gray-200 text-sm text-gray-700">
                Signed in as <strong className="ml-2 text-gray-900 truncate" style={{ maxWidth: 420 }}>{user.email}</strong>
              </div>
            ) : (
              <div className="text-sm text-orange-700 bg-orange-50 px-3 py-2 rounded-md">
                <div className="font-medium">Sign in required</div>
                <div className="text-xs text-orange-800 mt-1">You must be logged in to create a post.</div>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-3">The form adapts to the selected section. Required fields are enforced before submission.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Section */}
          <div>
            <FieldLabel>Section</FieldLabel>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className={baseInputClass}
              style={inputStyle}
              aria-label="Select section"
            >
              <option value="room">Room Rental</option>
              <option value="jobs">Job Search</option>
              <option value="general">General Information</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <FieldLabel>Title</FieldLabel>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief headline (e.g., Furnished 1BR in Hicksville)"
              className={baseInputClass}
              style={inputStyle}
            />
          </div>

          {/* ROOM fields */}
          {section === 'room' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Full Name</FieldLabel>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Owner or contact name" className={baseInputClass} style={inputStyle} />
                </div>

                <div>
                  <FieldLabel>Rent Amount (USD)</FieldLabel>
                  <div className="flex gap-2 items-center">
                    <input type="text" inputMode="numeric" value={rent} onChange={(e) => setRent(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="e.g., 2500" className={baseInputClass + ' w-2/3'} style={inputStyle} />
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={rentNegotiable} onChange={(e) => setRentNegotiable(e.target.checked)} className="form-checkbox" />
                      Negotiable
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FieldLabel>Street Address</FieldLabel>
                  <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="123 Main St" className={baseInputClass} style={inputStyle} />
                </div>

                <div>
                  <FieldLabel>City</FieldLabel>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Hicksville" className={baseInputClass} style={inputStyle} />
                </div>

                <div>
                  <FieldLabel>ZIP</FieldLabel>
                  <input type="text" value={zip} onChange={(e) => setZip(e.target.value.replace(/[^\d]/g, '').slice(0, 5))} placeholder="e.g., 11801" className={`${baseInputClass} ${isZipValid ? '' : 'border-red-400'}`} style={inputStyle} />
                  {!isZipValid && zip.length > 0 && <p className="text-xs text-red-500 mt-1">ZIP must be 5 digits</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel>Deposit (USD) — optional</FieldLabel>
                  <input type="text" inputMode="numeric" value={deposit} onChange={(e) => setDeposit(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="e.g., 3000" className={baseInputClass} style={inputStyle} />
                </div>

                <div>
                  <FieldLabel>Utilities included</FieldLabel>
                  <div className="flex items-center gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="radio" name="utils" value="yes" checked={utilitiesIncluded === 'yes'} onChange={() => setUtilitiesIncluded('yes')} className="form-radio" />
                      Yes
                    </label>
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="radio" name="utils" value="no" checked={utilitiesIncluded === 'no'} onChange={() => setUtilitiesIncluded('no')} className="form-radio" />
                      No
                    </label>
                  </div>

                  {utilitiesIncluded === 'no' && (
                    <div className="mt-2">
                      <input type="text" value={utilitiesCost} onChange={(e) => setUtilitiesCost(e.target.value)} placeholder="Estimated utilities per month (USD)" className={baseInputClass} style={inputStyle} />
                    </div>
                  )}
                </div>
              </div>

              {/* Property details */}
              <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Property details</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <FieldLabel>Number of bedrooms</FieldLabel>
                    <input type="text" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="e.g., 1" className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Number of bathrooms</FieldLabel>
                    <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="e.g., 1" className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Floor</FieldLabel>
                    <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="e.g., 3rd" className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Area (sqft)</FieldLabel>
                    <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g., 790" className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Room Type</FieldLabel>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className={baseInputClass} style={inputStyle}>
                      <option>Private room</option>
                      <option>Shared room</option>
                      <option>Studio</option>
                    </select>
                  </div>

                  <div>
                    <FieldLabel>Accommodates</FieldLabel>
                    <input type="text" value={accommodates} onChange={(e) => setAccommodates(e.target.value)} placeholder="e.g., 2" className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Accommodation Type</FieldLabel>
                    <select value={accommodationType} onChange={(e) => setAccommodationType(e.target.value)} className={baseInputClass} style={inputStyle}>
                      <option>Furnished</option>
                      <option>Unfurnished</option>
                      <option>Partially furnished</option>
                    </select>
                  </div>

                  <div>
                    <FieldLabel>Available from</FieldLabel>
                    <input type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} className={baseInputClass} style={inputStyle} />
                  </div>

                  <div>
                    <FieldLabel>Lease term</FieldLabel>
                    <select value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} className={baseInputClass} style={inputStyle}>
                      <option>6+ months</option>
                      <option>1 year</option>
                      <option>Month-to-month</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* JOBS */}
          {section === 'jobs' && (
            <>
              <div>
                <FieldLabel>Job Title</FieldLabel>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Part-time tutor" className={baseInputClass} style={inputStyle} />
              </div>

              <div>
                <FieldLabel>Contact Person</FieldLabel>
                <input type="text" value={jobContactPerson} onChange={(e) => setJobContactPerson(e.target.value)} placeholder="Hiring contact" className={baseInputClass} style={inputStyle} />
              </div>

              <div>
                <FieldLabel>Job Address (optional)</FieldLabel>
                <input type="text" value={jobAddress} onChange={(e) => setJobAddress(e.target.value)} placeholder="Company address (optional)" className={baseInputClass} style={inputStyle} />
              </div>
            </>
          )}

          {/* GENERAL */}
          {section === 'general' && (
            <div>
              <FieldLabel>Optional Title</FieldLabel>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short headline (optional)" className={baseInputClass} style={inputStyle} />
            </div>
          )}

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FieldLabel>Email</FieldLabel>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={baseInputClass} style={inputStyle} />
              {!isEmailValid && email.length > 0 && <p className="text-xs text-red-500 mt-1">Enter a valid email</p>}
            </div>

            <div>
              <FieldLabel>Preferred contact</FieldLabel>
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="pref" value="email" checked={preferredContact === 'email'} onChange={() => setPreferredContact('email')} className="form-radio" />
                  Email
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="radio" name="pref" value="phone" checked={preferredContact === 'phone'} onChange={() => setPreferredContact('phone')} className="form-radio" />
                  Phone
                </label>
              </div>

              {preferredContact === 'phone' && (
                <div className="mt-2">
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className={baseInputClass} style={inputStyle} />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <FieldLabel>Description</FieldLabel>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Write your post here..." className={`${baseInputClass} py-3 px-3 resize-vertical`} style={inputStyle} />
            {description.trim().length > 0 && description.trim().length < 3 && <p className="text-xs text-red-500 mt-1">Need at least 3 characters</p>}
          </div>

          {/* Preview + Submit area */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Preview</h3>
              <div className="border rounded-md p-4 bg-white shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{title || '(No title)'}</h4>
                    <div className="text-sm text-gray-600 mt-1">{description || '(No description yet)'}</div>
                  </div>
                  <div className="text-right text-sm text-gray-700">
                    {rent ? <div className="font-medium">${Number(rent || 0).toLocaleString()}</div> : null}
                    {rentNegotiable ? <div className="text-xs text-gray-500">Negotiable</div> : null}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <div className="font-medium">Address</div>
                  <div>{[street, city, zip].filter(Boolean).join(', ') || '—'}</div>

                  <div className="mt-2">
                    <div className="font-medium">Details</div>
                    <div className="text-xs text-gray-600">
                      {bedrooms ? `${bedrooms} bd` : '—'} · {bathrooms ? `${bathrooms} ba` : '—'} · {area ? `${area} sqft` : '—'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="w-full border rounded-md p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  {!user && (
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59A1.75 1.75 0 0 1 17.518 17H2.482A1.75 1.75 0 0 1 .74 14.689L7.257 3.099zM9 7a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V7zm1 7a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" clipRule="evenodd" />
                    </svg>
                  )}

                  <div>
                    <div className="text-sm font-medium text-orange-700 truncate">{!user ? 'Sign in required' : 'Ready to submit'}</div>
                    <div className="text-xs text-gray-600">{!user ? 'You must be logged in to create a post. Your contact will be associated with the post.' : 'When ready, click Submit'}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 justify-end">
                  <Link href="/Forums" className="inline-flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 border border-transparent">
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={!requiredChecks.isValid || loading || !user}
                    aria-disabled={!requiredChecks.isValid || loading || !user}
                    title={
                      !user
                        ? 'Sign in elsewhere to enable submission'
                        : !requiredChecks.isValid
                        ? 'Complete required fields to enable submit'
                        : loading
                        ? 'Submitting…'
                        : 'Submit post'
                    }
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                      loading ? 'bg-gray-400 text-white cursor-wait' : !requiredChecks.isValid || !user ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {loading ? 'Submitting…' : 'Submit'}
                  </button>
                </div>

                {submitError && <p className="text-sm text-red-600 mt-3">{submitError}</p>}
              </div>
            </div>
          </div>
        </form>

        <Footer />
      </main>
    </div>
  );
}
