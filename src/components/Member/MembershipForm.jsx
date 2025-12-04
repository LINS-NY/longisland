'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import banner from '/public/banner.png';
import { auth } from '@/firebaseconfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// LOCAL: set this to your local proxy or Apps Script URL while testing locally
const APPS_SCRIPT_URL = '/api/submitMembership'; // e.g., http://localhost:3000/api/submitMembership

const ADMIN_EMAIL = 'longislandnepalese@gmail.com';

const MEMBERSHIP_OPTIONS = [
  { value: 'lifetime', label: 'Lifetime Membership (New Enrollment)', fee: 105 },
  { value: 'general', label: 'General Membership', fee: 15 },
  { value: 'junior', label: 'Junior Membership', fee: 0 },
  { value: 'honorary', label: 'Honorary Membership', fee: 0, adminOnly: true }
];

const VERIFICATION_CHOICES = [
  'Long Island DMV Issued License or ID',
  'Federal Issued License or ID',
  'Green Card',
  'Passport',
  'Work Permit',
  'Student ID'
];

const MAX_FILES = 2;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_ATTACHMENTS_BYTES = 25 * 1024 * 1024; // 25 MB total

function sanitizeFilename(name = '') {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
}

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File read error'));
    reader.onload = () => {
      const result = reader.result;
      const comma = result.indexOf(',');
      const base64 = result.slice(comma + 1);
      resolve({ base64, mimeType: file.type || 'application/octet-stream', name: sanitizeFilename(file.name) });
    };
    reader.readAsDataURL(file);
  });
}

function computeAgeYears(day, month, year) {
  if (!day || !month || !year) return null;
  const d = parseInt(day, 10);
  const m = parseInt(month, 10) - 1;
  const y = parseInt(year, 10);
  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return null;
  const dob = new Date(y, m, d);
  if (isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const mDiff = now.getMonth() - dob.getMonth();
  if (mDiff < 0 || (mDiff === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

export default function MembershipForm() {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user?.email === ADMIN_EMAIL);
  }, [user]);

  const [form, setForm] = useState({
    membershipType: 'general',
    firstName: '',
    middleName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    contactMethod: '',
    dobDay: '',
    dobMonth: '',
    dobYear: ''
  });

  useEffect(() => {
    if (user?.email) setForm((s) => ({ ...s, email: user.email }));
  }, [user?.email]);

  const [verificationType, setVerificationType] = useState('');
  const [idNumbers, setIdNumbers] = useState({});
  const [files, setFiles] = useState([]);
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [paymentNoteAck, setPaymentNoteAck] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // confirm fields + inline errors
  const [confirmEmail, setConfirmEmail] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [confirmPhoneError, setConfirmPhoneError] = useState('');
  const [phoneFormatError, setPhoneFormatError] = useState('');

  const fee = useMemo(() => {
    const opt = MEMBERSHIP_OPTIONS.find((o) => o.value === form.membershipType);
    if (!opt) return 'Exempt';
    return opt.fee === 0 ? 'Exempt' : opt.fee;
  }, [form.membershipType]);

  const fullName = `${form.firstName} ${form.middleName ? form.middleName + ' ' : ''}${form.lastName}`.trim();

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || []).slice(0, MAX_FILES);
    setFiles(selected);
  };

  const signIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Sign-in error', err);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign-out error', err);
    }
  };

  // Normalizers
  const normalizePhone = (p) => (p || '').replace(/\D/g, ''); // digits only
  const normalizeEmail = (e) => (e || '').trim().toLowerCase();

  // Confirm handlers (real-time)
  const handleConfirmEmailChange = (value) => {
    setConfirmEmail(value);
    if (form.email && normalizeEmail(value) !== normalizeEmail(form.email)) {
      setConfirmEmailError('Email does not match. Please re-enter the exact email.');
    } else {
      setConfirmEmailError('');
    }
  };

  const handleConfirmPhoneChange = (value) => {
    setConfirmPhone(value);
    if (form.phone && normalizePhone(value) !== normalizePhone(form.phone)) {
      setConfirmPhoneError('Phone number does not match. Please re-enter the exact phone number.');
    } else {
      setConfirmPhoneError('');
    }
  };

  // Primary email change
  const handleEmailChange = (value) => {
    setForm((s) => ({ ...s, email: value }));
    if (confirmEmail && normalizeEmail(confirmEmail) !== normalizeEmail(value)) {
      setConfirmEmailError('Email does not match. Please re-enter the exact email.');
    } else {
      setConfirmEmailError('');
    }
  };

  // Phone input: digits-only, max 10, validate format
  const handlePhoneChange = (value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
    setForm((s) => ({ ...s, phone: digitsOnly }));

    if (digitsOnly.length === 0) {
      setPhoneFormatError('');
    } else if (!/^\d{10}$/.test(digitsOnly)) {
      setPhoneFormatError('Enter valid phone number no dashes or space. Exactly 10 digits required.');
    } else {
      setPhoneFormatError('');
    }

    if (confirmPhone && normalizePhone(confirmPhone) !== digitsOnly) {
      setConfirmPhoneError('Phone number does not match. Please re-enter the exact phone number.');
    } else {
      setConfirmPhoneError('');
    }
  };

  // Validation
  const validate = () => {
    const missing = [];

    if (!form.firstName.trim()) missing.push('firstName');
    if (!form.lastName.trim()) missing.push('lastName');
    if (!form.streetAddress.trim()) missing.push('streetAddress');
    if (!form.city.trim()) missing.push('city');
    if (!form.state.trim()) missing.push('state');
    if (!/^\d{5}$/.test(form.zip)) missing.push('zip');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) missing.push('email');
    if (!form.contactMethod) missing.push('contactMethod');
    if (!form.membershipType) missing.push('membershipType');

    // phone format: exactly 10 digits
    if (!/^\d{10}$/.test(normalizePhone(form.phone))) missing.push('phoneFormat');

    // confirm matches
    if (normalizeEmail(confirmEmail) !== normalizeEmail(form.email)) missing.push('confirmEmailMismatch');
    if (normalizePhone(confirmPhone) !== normalizePhone(form.phone)) missing.push('confirmPhoneMismatch');

    if (!verificationType) missing.push('verificationType');

    if (verificationType === 'Student ID') {
      if (!idNumbers['student_school'] || !String(idNumbers['student_school']).trim()) missing.push('student_school');
      if (!idNumbers['student_id'] || !String(idNumbers['student_id']).trim()) missing.push('student_id');
    } else if (verificationType) {
      if (!idNumbers[verificationType] || !String(idNumbers[verificationType]).trim()) missing.push(`idNumber:${verificationType}`);
    }

    if (!declarationAccepted) missing.push('declarationAccepted');
    if (!paymentNoteAck) missing.push('paymentNoteAck');

    if (form.membershipType === 'honorary' && !isAdmin) missing.push('honoraryNotAllowed');

    if (files.length > MAX_FILES) missing.push('tooManyFiles');
    let totalBytes = 0;
    for (const f of files) {
      if (!/^image\/|^application\/pdf/.test(f.type)) missing.push('invalidFileType');
      if (f.size > MAX_FILE_SIZE_BYTES) missing.push('fileTooLarge');
      totalBytes += f.size;
    }
    if (totalBytes > MAX_TOTAL_ATTACHMENTS_BYTES) missing.push('totalTooLarge');

    const age = computeAgeYears(form.dobDay, form.dobMonth, form.dobYear);
    if (!form.dobDay || !form.dobMonth || !form.dobYear) missing.push('dob');
    if (form.membershipType === 'junior') {
      if (age === null) missing.push('dobInvalid');
      else if (!(age < 18)) missing.push('juniorAge');
    }

    const messages = [];
    if (missing.includes('dob')) messages.push('Please enter Day, Month and Year for Date of Birth.');
    if (missing.includes('dobInvalid')) messages.push('Date of Birth looks invalid.');
    if (missing.includes('juniorAge')) messages.push('Junior membership requires the applicant to be under 18 years old.');
    if (missing.includes('verificationType')) messages.push('Select one verification document.');
    if (missing.includes('student_school')) messages.push('Enter College/School name for Student ID.');
    if (missing.includes('student_id')) messages.push('Enter College/School ID number.');
    if (missing.includes('declarationAccepted')) messages.push('You must accept the declaration.');
    if (missing.includes('paymentNoteAck')) messages.push('You must acknowledge the payment note.');
    if (missing.includes('invalidFileType')) messages.push('Only images and PDFs are allowed for uploads.');
    if (missing.includes('fileTooLarge')) messages.push('One or more files exceed the 5 MB limit.');
    if (missing.includes('tooManyFiles')) messages.push('Maximum 2 files allowed.');
    if (missing.includes('totalTooLarge')) messages.push('Total attachments exceed 25 MB.');
    if (missing.includes('zip')) messages.push('ZIP must be 5 digits.');
    if (missing.includes('email')) messages.push('Enter a valid email address.');
    if (missing.includes('confirmEmailMismatch')) messages.push('Confirm Email does not match the Email.');
    if (missing.includes('confirmPhoneMismatch')) messages.push('Confirm Phone does not match the Phone.');
    if (missing.includes('phoneFormat')) messages.push('Enter valid phone number no dashes or space. Exactly 10 digits required.');

    return { isValid: missing.length === 0, missing, messages, age };
  };

  const validationInfo = useMemo(() => validate(), [form, verificationType, idNumbers, files, declarationAccepted, paymentNoteAck, isAdmin, confirmEmail, confirmPhone]);
  const isFormValid = validationInfo.isValid;

  const clearFormState = () => {
    setForm({
      membershipType: 'general',
      firstName: '',
      middleName: '',
      lastName: '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      email: user?.email || '',
      contactMethod: '',
      dobDay: '',
      dobMonth: '',
      dobYear: ''
    });
    setVerificationType('');
    setIdNumbers({});
    setFiles([]);
    setDeclarationAccepted(false);
    setPaymentNoteAck(false);
    setConfirmEmail('');
    setConfirmPhone('');
    setConfirmEmailError('');
    setConfirmPhoneError('');
    setPhoneFormatError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');
    const checks = validate();
    if (!checks.isValid) {
      if (checks.missing.includes('juniorAge')) {
        setSubmitError('Junior membership requires the applicant to be under 18 years old.');
      } else if (checks.missing.includes('confirmEmailMismatch') || checks.missing.includes('confirmPhoneMismatch') || checks.missing.includes('phoneFormat')) {
        setSubmitError('Please correct the confirmation fields or phone format errors.');
      } else {
        setSubmitError('Please complete required fields and fix file/verification issues.');
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const attachments = [];
      for (const f of files) {
        if (!/^image\/|^application\/pdf/.test(f.type)) throw new Error('Only images and PDFs allowed');
        if (f.size > MAX_FILE_SIZE_BYTES) throw new Error('File too large');
        const { base64, mimeType, name } = await fileToBase64(f);
        attachments.push({ name, mimeType, data: base64 });
      }

      const verificationIdNumbers = {};
      if (verificationType === 'Student ID') {
        verificationIdNumbers['Student ID_school'] = idNumbers['student_school'] || '';
        verificationIdNumbers['Student ID_number'] = idNumbers['student_id'] || '';
      } else if (verificationType) {
        verificationIdNumbers[verificationType] = idNumbers[verificationType] || '';
      }

      const payload = {
        membershipType: form.membershipType,
        fee: fee === 'Exempt' ? 'Exempt' : Number(fee),
        firstName: form.firstName,
        middleName: form.middleName,
        lastName: form.lastName,
        fullName,
        streetAddress: form.streetAddress,
        apartment: form.apartment || '',
        city: form.city,
        state: form.state,
        zip: form.zip,
        phone: form.phone,
        email: form.email,
        contactMethod: form.contactMethod,
        dobDay: form.dobDay,
        dobMonth: form.dobMonth,
        dobYear: form.dobYear,
        verificationTypes: verificationType ? [verificationType] : [],
        verificationIdNumbers,
        declarationAccepted,
        paymentNoteAck,
        signatureName: fullName,
        submittedBy: user?.email || '',
        attachments
      };

      // send payload to Apps Script and handle response (local-friendly)
      const submitRes = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // read raw text first for robust diagnostics
      const rawText = await submitRes.text();
      let parsedJson = null;
      try {
        parsedJson = JSON.parse(rawText);
      } catch (e) {
        // not JSON — keep rawText for diagnostics
      }

      console.log('Submit response status:', submitRes.status);
      console.log('Submit response body preview:', (rawText || '').slice(0, 1000));

      if (!submitRes.ok) {
        const serverMessage = parsedJson?.message || rawText || `Server returned ${submitRes.status}`;
        console.error('Apps Script error — status:', submitRes.status, 'body:', parsedJson || rawText);
        throw new Error(serverMessage);
      }

      // success
      clearFormState();
      setSuccessMessage(`Submitted successfully. Invoice: ${parsedJson?.invoice || 'N/A'}. Check your email for receipt.`);
      setTimeout(() => setSuccessMessage(''), 8000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-lg overflow-hidden shadow-md">
        <Image src={banner} alt="LINS-NY Banner" className="w-full h-44 md:h-56 lg:h-72 object-cover" priority />
      </div>

      <div className="mt-3">
        <div className="bg-white rounded-md p-3 shadow-sm flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-700">
              <strong className="text-gray-900">Admin login (optional)</strong>
              <span className="ml-2 text-xs text-gray-500">— only required for admin tasks such as selecting Honorary membership</span>
            </div>
            <div className="text-xs text-gray-500 mt-1 truncate">
              Signing in is optional. New members do not need to sign in to submit the form.
            </div>
            {user && (
              <div className="mt-2 text-sm text-gray-700 truncate">
                Signed in as <strong className="text-gray-900">{user.email}</strong>
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            {user ? (
              <button onClick={signOutUser} className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300" aria-label="Sign out">
                Sign out
              </button>
            ) : (
              <button onClick={signIn} className="px-4 py-2 bg-red-600 text-white text-sm rounded-md shadow hover:bg-red-700" aria-label="Sign in with Gmail">
                🔐 Sign in (Gmail)
              </button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6 text-black">
        <div className="rounded-md p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">🎟️ Membership Type</h2>
              <p className="text-sm opacity-90">Choose the membership that fits you</p>
            </div>
            <div className="text-right">
              <div className="text-sm">Membership Fee</div>
              <div className="text-2xl font-extrabold text-green-200 mt-1">
                {fee === 'Exempt' ? 'Exempt' : `USD ${Number(fee).toFixed(2)}`}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <select value={form.membershipType} onChange={(e) => setForm({ ...form, membershipType: e.target.value })} className="w-full p-3 rounded text-black">
              {MEMBERSHIP_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.adminOnly && !isAdmin}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="mt-2 text-xs text-gray-100">
              <span>💡 No online payment. Invoice & payment instructions (Zelle or check) will be emailed.</span>
              <div className="text-red-200 mt-1">⚠️ Applicants aged below 18 are not entitled to voting rights.</div>
            </div>
            {form.membershipType === 'honorary' && !isAdmin && (
              <div className="mt-2 text-sm text-yellow-100">Honorary membership requires admin sign-in (Gmail). Please sign in above if you are the admin.</div>
            )}
          </div>
        </div>

        {/* Name row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name *</label>
            <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Middle Name</label>
            <input value={form.middleName} onChange={(e) => setForm({ ...form, middleName: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name *</label>
            <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* DOB right after full name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Date of Birth *</label>
            <div className="flex gap-2">
              <select value={form.dobDay} onChange={(e) => setForm({ ...form, dobDay: e.target.value })} className="p-2 border rounded w-1/3">
                <option value="">DD</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={String(d)}>{d}</option>)}
              </select>
              <select value={form.dobMonth} onChange={(e) => setForm({ ...form, dobMonth: e.target.value })} className="p-2 border rounded w-1/3">
                <option value="">MM</option>
                {months.map((m, idx) => <option key={m} value={String(idx + 1)}>{m}</option>)}
              </select>
              <input value={form.dobYear} onChange={(e) => setForm({ ...form, dobYear: e.target.value.replace(/[^\d]/g, '').slice(0,4) })} placeholder="YYYY" className="p-2 border rounded w-1/3" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Street Address *</label>
            <input value={form.streetAddress} onChange={(e) => setForm({ ...form, streetAddress: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Apartment, suite, etc.</label>
            <input value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} className="w-full p-2 border rounded" />
          </div>
        </div>

        {/* Remaining fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">City *</label>
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">State *</label>
            <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">ZIP *</label>
            <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/[^\d]/g, '').slice(0, 5) })} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Phone *</label>
            <input
              value={form.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter 10 digits, no dashes or spaces"
              inputMode="numeric"
            />
            {phoneFormatError && <div className="text-sm text-red-600 mt-1">{phoneFormatError}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Phone *</label>
            <input value={confirmPhone} onChange={(e) => handleConfirmPhoneChange(e.target.value)} className="w-full p-2 border rounded" placeholder="Re-enter phone" inputMode="numeric" />
            {confirmPhoneError && <div className="text-sm text-red-600 mt-1">{confirmPhoneError}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input value={form.email} onChange={(e) => handleEmailChange(e.target.value)} type="email" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Email *</label>
            <input value={confirmEmail} onChange={(e) => handleConfirmEmailChange(e.target.value)} type="email" className="w-full p-2 border rounded" />
            {confirmEmailError && <div className="text-sm text-red-600 mt-1">{confirmEmailError}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Preferred Contact Method *</label>
            <select value={form.contactMethod} onChange={(e) => setForm({ ...form, contactMethod: e.target.value })} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="Phone">Phone</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div />
          <div />
        </div>

        <div>
          <label className="block mb-2 font-medium">Mandatory Documentation (select one) *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {VERIFICATION_CHOICES.map((choice) => (
              <div key={choice} className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2 w-full">
                  <input
                    type="radio"
                    name="verification"
                    value={choice}
                    checked={verificationType === choice}
                    onChange={() => {
                      setVerificationType(choice);
                      setIdNumbers((prev) => {
                        const copy = { ...prev };
                        if (choice !== 'Student ID') {
                          delete copy['student_school'];
                          delete copy['student_id'];
                        }
                        return copy;
                      });
                    }}
                  />
                  <span>{choice}</span>
                </label>

                {verificationType === choice && choice !== 'Student ID' && (
                  <input
                    type="text"
                    placeholder={`${choice} number`}
                    value={idNumbers[choice] || ''}
                    onChange={(e) => setIdNumbers((prev) => ({ ...prev, [choice]: e.target.value }))}
                    className="ml-4 p-2 border rounded"
                    required
                  />
                )}

                {verificationType === choice && choice === 'Student ID' && (
                  <div className="ml-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="College / School Name"
                      value={idNumbers['student_school'] || ''}
                      onChange={(e) => setIdNumbers((prev) => ({ ...prev, student_school: e.target.value }))}
                      className="p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      placeholder="College / School ID"
                      value={idNumbers['student_id'] || ''}
                      onChange={(e) => setIdNumbers((prev) => ({ ...prev, student_id: e.target.value }))}
                      className="p-2 border rounded"
                      required
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-3">
            <label className="block mb-2 font-medium">Upload verification files (optional, up to 2 files, images or PDF, max 5 MB each)</label>
            <input type="file" accept="image/*,application/pdf" multiple onChange={handleFilesChange} />
            <div className="text-xs text-gray-500 mt-1">Files will be attached to your confirmation email. Total attachments must be under 25 MB.</div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <div className="text-sm font-semibold mb-2">Declaration for Eligibility and Participation in the Electoral Process</div>
          <div className="text-xs mb-3">
            I hereby declare that, in accordance with the electoral requirements stipulated in the LINS Bylaws, I shall present myself in person at the designated polling venue and provide a valid DMV-issued identification card for verification purposes. I affirm my commitment to adhere to all prescribed rules, regulations, and the code of conduct governing the election process. I further acknowledge that, should any documents submitted by me be found to be inaccurate, falsified, or unverifiable, I shall forfeit my eligibility to participate in the voting process.
          </div>

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={declarationAccepted} onChange={(e) => setDeclarationAccepted(e.target.checked)} />
            <span className="text-sm">I acknowledge and accept the declaration. (Required)</span>
          </label>

          <div className="mt-3">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={paymentNoteAck} onChange={(e) => setPaymentNoteAck(e.target.checked)} />
              <span className="text-sm">I understand payment is external (Zelle or check) and invoice will be emailed. (Required)</span>
            </label>
          </div>

          <div className="mt-3 text-sm">
            <div>Signature (derived): <strong>{fullName || '(Full name will be used as signature)'}</strong></div>
          </div>
        </div>

        {submitError && <div className="text-sm text-red-600">{submitError}</div>}
        {!submitError && validationInfo?.messages?.length > 0 && (
          <div className="text-sm text-yellow-700 space-y-1">
            {validationInfo.messages.map((m, i) => <div key={i}>• {m}</div>)}
          </div>
        )}

        {successMessage && <div className="text-sm text-green-700">{successMessage}</div>}

        <div className="flex gap-3">
          <button type="submit" disabled={!isFormValid || isSubmitting} className={`flex-1 py-3 rounded text-white ${!isFormValid || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}>
            {isSubmitting ? 'Submitting…' : 'Submit Membership'}
          </button>
        </div>
      </form>
    </div>
  );
}
