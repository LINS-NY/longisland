/* Comment out beow code to enable the membership form. */


'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import banner from '/public/banner.png';

export default function MembershipForm() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in zoom-in-95 duration-700">
      
      {/* 🌈 Dynamic Banner Section */}
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/1] md:aspect-[4/1]">
        <Image
          src={banner}
          alt="LINS-NY Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-transparent mix-blend-overlay" />
      </div>

      {/* 🎊 The "Vibrant" Message Card */}
      <div className="mt-10 relative">
        {/* Decorative background blobs for extra "color" */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-200 rounded-full blur-3xl opacity-50" />

        <div className="relative bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white p-8 md:p-16 text-center">
          
          <div className="inline-block mb-6 animate-bounce">
            <span className="text-6xl">📮</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mb-6">
            Registration is Now Closed !!!
          </h1>

          <div className="space-y-6 max-w-2xl mx-auto">
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
              The clock has struck **04/07/2026 11:59 PM** 🕛 and our membership application window is now officially tucked away for this Tenure.
            </p>

            {/* 💖 Heartfelt Thank You Section */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-inner">
              <h2 className="text-2xl font-bold text-orange-700 mb-2 flex items-center justify-center gap-2">
                Namaste & Thank You! 🙏
              </h2>
              <p className="text-gray-600 italic">
                "To everyone who has registered—you are amazing! 🌟 You are the heart and soul of the **Long Island Nepalese Society**. We are so excited to have you on board as we build a stronger community together! ❤️"
              </p>
            </div>

            <p className="text-gray-500 pt-4">
              If you have any questions! We're still here to help. 🤝
            </p>

            {/* ✨ Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                href="/Contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:scale-105"
              >
                Get in Touch 📩
              </Link>
              
              <Link
                href="/"
                className="px-8 py-4 font-bold text-gray-600 hover:text-red-500 transition-colors flex items-center gap-2"
              >
                🏠 Back to Home
              </Link>
            </div>
          </div>

          {/* 🏔️ Footer Branding */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-sm font-black text-gray-500 uppercase tracking-widest">
              Long Island Nepalese Society, New York 
            </p>
            <p className="text-[12px] text-gray-500 mt-2">
              Building Unity, Preserving Culture, Creating Impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



/* Uncomment below code to enable the membership form. 
Make sure to set up the APPS_SCRIPT_URL and ADMIN_EMAIL constants appropriately, 
and ensure your environment supports Firebase authentication if you want to use the admin features. */

// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import Image from 'next/image';
// import banner from '/public/banner.png';
// import { auth } from '@/firebaseconfig';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


// // LOCAL: set this to your local proxy or Apps Script URL while testing locally
// const APPS_SCRIPT_URL = '/api/submitMembership'; // e.g., http://localhost:3000/api/submitMembership

// const ADMIN_EMAIL = 'longislandnepalese@gmail.com';

// const MEMBERSHIP_OPTIONS = [
//   { value: 'lifetime', label: 'Lifetime Membership', fee: 105 },
//   { value: 'general', label: 'General Membership', fee: 15 },
//   { value: 'junior', label: 'Junior Membership', fee: 0 },
//   { value: 'honorary', label: 'Honorary Membership', fee: 0, adminOnly: true }
// ];

// const VERIFICATION_CHOICES = [
//   'State-Issued (DMV) Driver’s License or ID',
//   'Federal Issued License or ID',
//   'Green Card',
//   'Passport',
//   'Work Permit',
//   'Student ID'
// ];

// const MAX_FILES = 2;
// const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB per file
// const MAX_TOTAL_ATTACHMENTS_BYTES = 25 * 1024 * 1024; // 25 MB total

// function sanitizeFilename(name = '') {
//   return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120);
// }

// async function fileToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onerror = () => reject(new Error('File read error'));
//     reader.onload = () => {
//       const result = reader.result;
//       const comma = result.indexOf(',');
//       const base64 = result.slice(comma + 1);
//       resolve({ base64, mimeType: file.type || 'application/octet-stream', name: sanitizeFilename(file.name) });
//     };
//     reader.readAsDataURL(file);
//   });
// }

// function computeAgeYears(day, month, year) {
//   if (!day || !month || !year) return null;
//   const d = parseInt(day, 10);
//   const m = parseInt(month, 10) - 1;
//   const y = parseInt(year, 10);
//   if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) return null;
//   const dob = new Date(y, m, d);
//   if (isNaN(dob.getTime())) return null;
//   const now = new Date();
//   let age = now.getFullYear() - dob.getFullYear();
//   const mDiff = now.getMonth() - dob.getMonth();
//   if (mDiff < 0 || (mDiff === 0 && now.getDate() < dob.getDate())) age--;
//   return age;
// }

// export default function MembershipForm() {
//   const [user] = useAuthState(auth);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     setIsAdmin(user?.email === ADMIN_EMAIL);
//   }, [user]);

//   const [form, setForm] = useState({
//     membershipType: 'general',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     streetAddress: '',
//     apartment: '',
//     city: '',
//     state: '',
//     zip: '',
//     phone: '',
//     email: '',
//     contactMethod: '',
//     dobDay: '',
//     dobMonth: '',
//     dobYear: ''
//   });

//   useEffect(() => {
//     if (user?.email) setForm((s) => ({ ...s, email: user.email }));
//   }, [user?.email]);

//   const [verificationType, setVerificationType] = useState('');
//   const [idNumbers, setIdNumbers] = useState({});
//   const [files, setFiles] = useState([]);
//   const [declarationAccepted, setDeclarationAccepted] = useState(false);
//   const [paymentNoteAck, setPaymentNoteAck] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // confirm fields + inline errors
//   const [confirmEmail, setConfirmEmail] = useState('');
//   const [confirmPhone, setConfirmPhone] = useState('');
//   const [confirmEmailError, setConfirmEmailError] = useState('');
//   const [confirmPhoneError, setConfirmPhoneError] = useState('');
//   const [phoneFormatError, setPhoneFormatError] = useState('');

//   // DOB/age helper state (only for UI feedback; validation enforced in validate())
//   const [age, setAge] = useState(null);
//   const [dobError, setDobError] = useState('');

//   const fee = useMemo(() => {
//     const opt = MEMBERSHIP_OPTIONS.find((o) => o.value === form.membershipType);
//     if (!opt) return 'Exempt';
//     return opt.fee === 0 ? 'Exempt' : opt.fee;
//   }, [form.membershipType]);

//   const fullName = `${form.firstName} ${form.middleName ? form.middleName + ' ' : ''}${form.lastName}`.trim();

//   const handleFilesChange = (e) => {
//     const selected = Array.from(e.target.files || []).slice(0, MAX_FILES);
//     setFiles(selected);
//   };

//   const signIn = async () => {
//     try {
//       const provider = new GoogleAuthProvider();
//       await signInWithPopup(auth, provider);
//     } catch (err) {
//       console.error('Sign-in error', err);
//     }
//   };

//   const signOutUser = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error('Sign-out error', err);
//     }
//   };

//   // Normalizers
//   const normalizePhone = (p) => (p || '').replace(/\D/g, ''); // digits only
//   const normalizeEmail = (e) => (e || '').trim().toLowerCase();

//   // Confirm handlers (real-time)
//   const handleConfirmEmailChange = (value) => {
//     setConfirmEmail(value);
//     if (form.email && normalizeEmail(value) !== normalizeEmail(form.email)) {
//       setConfirmEmailError('Email does not match. Please re-enter the exact email.');
//     } else {
//       setConfirmEmailError('');
//     }
//   };

//   const handleConfirmPhoneChange = (value) => {
//     setConfirmPhone(value);
//     if (form.phone && normalizePhone(value) !== normalizePhone(form.phone)) {
//       setConfirmPhoneError('Phone number does not match. Please re-enter the exact phone number.');
//     } else {
//       setConfirmPhoneError('');
//     }
//   };

//   // Primary email change
//   const handleEmailChange = (value) => {
//     setForm((s) => ({ ...s, email: value }));
//     if (confirmEmail && normalizeEmail(confirmEmail) !== normalizeEmail(value)) {
//       setConfirmEmailError('Email does not match. Please re-enter the exact email.');
//     } else {
//       setConfirmEmailError('');
//     }
//   };

//   // Phone input: digits-only, max 10, validate format
//   const handlePhoneChange = (value) => {
//     const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
//     setForm((s) => ({ ...s, phone: digitsOnly }));

//     if (digitsOnly.length === 0) {
//       setPhoneFormatError('');
//     } else if (!/^\d{10}$/.test(digitsOnly)) {
//       setPhoneFormatError('Enter valid phone number no dashes or space. Exactly 10 digits required.');
//     } else {
//       setPhoneFormatError('');
//     }

//     if (confirmPhone && normalizePhone(confirmPhone) !== digitsOnly) {
//       setConfirmPhoneError('Phone number does not match. Please re-enter the exact phone number.');
//     } else {
//       setConfirmPhoneError('');
//     }
//   };

//   // Recompute age for UI feedback whenever DOB fields change.
//   // This does not change other behavior except showing messages.
//   useEffect(() => {
//     const a = computeAgeYears(form.dobDay, form.dobMonth, form.dobYear);
//     setAge(a);

//     // Reset dobError if fields are incomplete
//     if (!form.dobDay || !form.dobMonth || !form.dobYear) {
//       setDobError('');
//       return;
//     }

//     if (a === null) {
//       setDobError('Date of Birth looks invalid.');
//       return;
//     }

//     // Applicants under 16 cannot be processed at all — show immediate feedback
//     if (a < 16) {
//       setDobError('Applicants under 16 cannot be processed.');
//       return;
//     }

//     // If user selected Junior but age is above 18, show a warning (validation will block submission)
//     // Junior membership is allowed for ages 16, 17, 18 (inclusive)
//     if (form.membershipType === 'junior' && a > 18) {
//       setDobError('Junior membership is only for ages 16–18. You will need to select General or Lifetime membership.');
//       return;
//     }

//     setDobError('');
//   }, [form.dobDay, form.dobMonth, form.dobYear, form.membershipType]);

//   // Validation
//   const validate = () => {
//     const missing = [];

//     if (!form.firstName.trim()) missing.push('firstName');
//     if (!form.lastName.trim()) missing.push('lastName');
//     if (!form.streetAddress.trim()) missing.push('streetAddress');
//     if (!form.city.trim()) missing.push('city');
//     if (!form.state.trim()) missing.push('state');
//     if (!/^\d{5}$/.test(form.zip)) missing.push('zip');
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) missing.push('email');
//     if (!form.contactMethod) missing.push('contactMethod');
//     if (!form.membershipType) missing.push('membershipType');

//     // phone format: exactly 10 digits
//     if (!/^\d{10}$/.test(normalizePhone(form.phone))) missing.push('phoneFormat');

//     // confirm matches
//     if (normalizeEmail(confirmEmail) !== normalizeEmail(form.email)) missing.push('confirmEmailMismatch');
//     if (normalizePhone(confirmPhone) !== normalizePhone(form.phone)) missing.push('confirmPhoneMismatch');

//     if (!verificationType) missing.push('verificationType');

//     if (verificationType === 'Student ID') {
//       if (!idNumbers['student_school'] || !String(idNumbers['student_school']).trim()) missing.push('student_school');
//       if (!idNumbers['student_id'] || !String(idNumbers['student_id']).trim()) missing.push('student_id');
//     } else if (verificationType) {
//       if (!idNumbers[verificationType] || !String(idNumbers[verificationType]).trim()) missing.push(`idNumber:${verificationType}`);
//     }

//     if (!declarationAccepted) missing.push('declarationAccepted');
//     if (!paymentNoteAck) missing.push('paymentNoteAck');

//     if (form.membershipType === 'honorary' && !isAdmin) missing.push('honoraryNotAllowed');

//     if (files.length > MAX_FILES) missing.push('tooManyFiles');
//     let totalBytes = 0;
//     for (const f of files) {
//       if (!/^image\/|^application\/pdf/.test(f.type)) missing.push('invalidFileType');
//       if (f.size > MAX_FILE_SIZE_BYTES) missing.push('fileTooLarge');
//       totalBytes += f.size;
//     }
//     if (totalBytes > MAX_TOTAL_ATTACHMENTS_BYTES) missing.push('totalTooLarge');

//     const computedAge = computeAgeYears(form.dobDay, form.dobMonth, form.dobYear);
//     if (!form.dobDay || !form.dobMonth || !form.dobYear) missing.push('dob');
//     if (computedAge === null && form.dobDay && form.dobMonth && form.dobYear) missing.push('dobInvalid');

//     // Block under-16 applicants entirely
//     if (computedAge !== null && computedAge < 16) missing.push('tooYoung');

//     // Junior membership validation only applies if user selected Junior
//     // Junior membership allowed for ages 16, 17, 18 (inclusive)
//     if (form.membershipType === 'junior') {
//       if (computedAge === null) missing.push('dobInvalid');
//       else if (!(computedAge >= 16 && computedAge <= 18)) missing.push('juniorAge');
//     }

//     const messages = [];
//     if (missing.includes('dob')) messages.push('Please enter Day, Month and Year for Date of Birth.');
//     if (missing.includes('dobInvalid')) messages.push('Date of Birth looks invalid.');
//     if (missing.includes('tooYoung')) messages.push('Applicants under 16 cannot be processed.');
//     if (missing.includes('juniorAge')) messages.push('Junior membership is only for ages 16–18. Please choose General or Lifetime membership.');
//     //if (missing.includes('verificationType')) messages.push('Select one verification document.');
//     if (missing.includes('contactMethod')) messages.push('Select Preferred Contact Method.');
//     if (missing.includes('student_school')) messages.push('Enter College/School name for Student ID.');
//     if (missing.includes('student_id')) messages.push('Enter College/School ID number.');
//     if (missing.includes('declarationAccepted')) messages.push('You must accept the declaration.');
//     if (missing.includes('paymentNoteAck')) messages.push('You must acknowledge the payment note.');
//     if (missing.includes('invalidFileType')) messages.push('Only images and PDFs are allowed for uploads.');
//     if (missing.includes('fileTooLarge')) messages.push('One or more files exceed the 5 MB limit.');
//     if (missing.includes('tooManyFiles')) messages.push('Maximum 2 files allowed.');
//     if (missing.includes('totalTooLarge')) messages.push('Total attachments exceed 25 MB.');
//     if (missing.includes('zip')) messages.push('ZIP must be 5 digits.');
//     if (missing.includes('email')) messages.push('Enter a valid email address.');
//     if (missing.includes('confirmEmailMismatch')) messages.push('Confirm Email does not match the Email.');
//     if (missing.includes('confirmPhoneMismatch')) messages.push('Confirm Phone does not match the Phone.');
//     if (missing.includes('phoneFormat')) messages.push('Enter valid phone number no dashes or space. Exactly 10 digits required.');
//     if (missing.includes('honoraryNotAllowed')) messages.push('Honorary membership requires admin sign-in.');

//     return { isValid: missing.length === 0, missing, messages, age: computedAge };
//   };

//   const validationInfo = useMemo(() => validate(), [form, verificationType, idNumbers, files, declarationAccepted, paymentNoteAck, isAdmin, confirmEmail, confirmPhone]);
//   const isFormValid = validationInfo.isValid;

//   const clearFormState = () => {
//     setForm({
//       membershipType: 'general',
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       streetAddress: '',
//       apartment: '',
//       city: '',
//       state: '',
//       zip: '',
//       phone: '',
//       email: user?.email || '',
//       contactMethod: '',
//       dobDay: '',
//       dobMonth: '',
//       dobYear: ''
//     });
//     setVerificationType('');
//     setIdNumbers({});
//     setFiles([]);
//     setDeclarationAccepted(false);
//     setPaymentNoteAck(false);
//     setConfirmEmail('');
//     setConfirmPhone('');
//     setConfirmEmailError('');
//     setConfirmPhoneError('');
//     setPhoneFormatError('');
//     setAge(null);
//     setDobError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitError('');
//     setSuccessMessage('');
//     const checks = validate();
//     if (!checks.isValid) {
//       if (checks.missing.includes('tooYoung')) {
//         setSubmitError('Cannot process the form: applicants under 16 are not eligible.');
//       } else if (checks.missing.includes('juniorAge')) {
//         setSubmitError('Junior membership is only for ages 16–18. Please select General or Lifetime membership.');
//       } else if (checks.missing.includes('confirmEmailMismatch') || checks.missing.includes('confirmPhoneMismatch') || checks.missing.includes('phoneFormat')) {
//         setSubmitError('Please correct the confirmation fields or phone format errors.');
//       } else {
//         setSubmitError('Please complete required fields and fix file/verification issues.');
//       }
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const attachments = [];
//       for (const f of files) {
//         if (!/^image\/|^application\/pdf/.test(f.type)) throw new Error('Only images and PDFs allowed');
//         if (f.size > MAX_FILE_SIZE_BYTES) throw new Error('File too large');
//         const { base64, mimeType, name } = await fileToBase64(f);
//         attachments.push({ name, mimeType, data: base64 });
//       }

//       const verificationIdNumbers = {};
//       if (verificationType === 'Student ID') {
//         verificationIdNumbers['Student ID_school'] = idNumbers['student_school'] || '';
//         verificationIdNumbers['Student ID_number'] = idNumbers['student_id'] || '';
//       } else if (verificationType) {
//         verificationIdNumbers[verificationType] = idNumbers[verificationType] || '';
//       }

//       const payload = {
//         membershipType: form.membershipType,
//         fee: fee === 'Exempt' ? 'Exempt' : Number(fee),
//         firstName: form.firstName,
//         middleName: form.middleName,
//         lastName: form.lastName,
//         fullName,
//         streetAddress: form.streetAddress,
//         apartment: form.apartment || '',
//         city: form.city,
//         state: form.state,
//         zip: form.zip,
//         phone: form.phone,
//         email: form.email,
//         contactMethod: form.contactMethod,
//         dobDay: form.dobDay,
//         dobMonth: form.dobMonth,
//         dobYear: form.dobYear,
//         verificationTypes: verificationType ? [verificationType] : [],
//         verificationIdNumbers,
//         declarationAccepted,
//         paymentNoteAck,
//         signatureName: fullName,
//         submittedBy: user?.email || '',
//         attachments
//       };

//       // send payload to Apps Script and handle response (local-friendly)
//       const submitRes = await fetch(APPS_SCRIPT_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload)
//       });

//       // read raw text first for robust diagnostics
//       const rawText = await submitRes.text();
//       let parsedJson = null;
//       try {
//         parsedJson = JSON.parse(rawText);
//       } catch (e) {
//         // not JSON — keep rawText for diagnostics
//       }

//       console.log('Submit response status:', submitRes.status);
//       console.log('Submit response body preview:', (rawText || '').slice(0, 1000));

//       if (!submitRes.ok) {
//         const serverMessage = parsedJson?.message || rawText || `Server returned ${submitRes.status}`;
//         console.error('Apps Script error — status:', submitRes.status, 'body:', parsedJson || rawText);
//         throw new Error(serverMessage);
//       }

//       // success
//       clearFormState();
//       setSuccessMessage(`Submitted successfully. Invoice: ${parsedJson?.invoice || 'N/A'}. Check your email for receipt.`);
//       setTimeout(() => setSuccessMessage(''), 8000);
//     } catch (err) {
//       console.error(err);
//       setSubmitError(err.message || 'Submission failed');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

//   return (
//     <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//       <div className="rounded-lg overflow-hidden shadow-md">
//         <Image src={banner} alt="LINS-NY Banner" className="w-full h-44 md:h-56 lg:h-72 object-cover" priority />
//       </div>

//       <div className="mt-3">
//         <div className="bg-white rounded-md p-3 shadow-sm flex items-center justify-between gap-4">
//           <div className="flex-1 min-w-0">
//             <div className="text-sm text-gray-700">
//               <strong className="text-gray-900">Admin login (optional)</strong>
//               <span className="ml-2 text-xs text-gray-500">— only required for admin tasks such as selecting Honorary membership</span>
//             </div>
//             <div className="text-xs text-gray-500 mt-1 truncate">
//               Signing in is optional. New members do not need to sign in to submit the form.
//             </div>
//             {user && (
//               <div className="mt-2 text-sm text-gray-700 truncate">
//                 Signed in as <strong className="text-gray-900">{user.email}</strong>
//               </div>
//             )}
//           </div>

//           <div className="flex-shrink-0">
//             {user ? (
//               <button onClick={signOutUser} className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300" aria-label="Sign out">
//                 Sign out
//               </button>
//             ) : (
//               <button onClick={signIn} className="px-4 py-2 bg-red-600 text-white text-sm rounded-md shadow hover:bg-red-700" aria-label="Sign in with Gmail">
//                 🔐 Sign in (Gmail)
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6 text-black">
//         <div className="rounded-md p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold">🎟️ Membership Type</h2>
//               <p className="text-sm opacity-90">Choose the membership that fits you</p>
//             </div>
//             <div className="text-right">
//               <div className="text-sm">Membership Fee</div>
//               <div className="text-2xl font-extrabold text-green-200 mt-1">
//                 {fee === 'Exempt' ? 'Exempt' : `USD ${Number(fee).toFixed(2)}`}
//               </div>
//             </div>
//           </div>

//           <div className="mt-4">
//             {/* Junior remains selectable by default; validation only when selected */}
//             <select value={form.membershipType} onChange={(e) => setForm({ ...form, membershipType: e.target.value })} className="w-full p-3 rounded text-black">
//               {MEMBERSHIP_OPTIONS.map((opt) => (
//                 <option key={opt.value} value={opt.value} disabled={opt.adminOnly && !isAdmin}>
//                   {opt.label}
//                 </option>
//               ))}
//             </select>
//             <div className="mt-3">
//     <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4 text-sm text-black shadow-sm">
//       <h3 className="text-base font-semibold mb-2">Payment instructions</h3>

//       <p className="text-sm font-medium">To make a Zelle payment:</p>
//       <p className="mt-1 text-sm">
//         Send Zelle to <span className="font-semibold">longislandnepalese@gmail.com</span>.
//       </p>

//       <p className="mt-3 text-sm">
//         After payment, please contact the President to verify and complete your registration:
//       </p>
//       <p className="mt-1 text-sm font-medium">Kul Prasad Gouli (Rajan) — +1 (718) 974-7252</p>

//       <div className="mt-3 text-sm">
//         <p className="font-medium">Other payment methods</p>
//         <p className="mt-1 text-sm">
//           For payments other than Zelle (cash, check, bank transfer, etc.),
//         </p>
//         <p className="mt-1 text-sm">
//           Contact the Co‑Treasurer:
//         </p>
//         <p className="mt-1 text-sm font-medium">Ram Kumar Rai — +1 (516) 800-5478</p>
//       </div>

//       <div className="mt-3 rounded-md bg-rose-900/10 p-2 text-sm text-rose-700">
//         <strong>Important:</strong> Registration will remain <span className="font-semibold">incomplete</span> until full payment is received and verified.
//       </div>
//     </div>
//   </div>

//   <div className="mt-2 text-xs text-gray-100">
//     <span>💡 No online payment. Invoice & payment instructions will also be emailed.</span>
//     <div className="text-red-200 mt-1">⚠️ Applicants and Junior Members between the ages of 16 and 18 are not entitled to voting rights.</div>
//   </div>

//   {form.membershipType === 'honorary' && !isAdmin && (
//     <div className="mt-2 text-sm text-yellow-100">
//       Honorary membership requires admin sign-in (Gmail). Please sign in above if you are the admin.
//     </div>
//   )}

//   {age !== null && age < 16 && (
//     <div className="mt-2 text-sm text-red-200">Applicants under 16 cannot be processed.</div>
//   )}

//   {dobError && age !== null && (
//     <div className="mt-2 text-sm text-yellow-100">{dobError}</div>
//   )}
// </div>
//         </div>

//         {/* Name row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">First Name *</label>
//             <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Middle Name</label>
//             <input value={form.middleName} onChange={(e) => setForm({ ...form, middleName: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Last Name *</label>
//             <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//         </div>

//         {/* Date of Birth */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Date of Birth *</label>
//             <div className="flex gap-2">
//               <select value={form.dobDay} onChange={(e) => setForm({ ...form, dobDay: e.target.value })} className="p-2 border rounded w-1/3">
//                 <option value="">DD</option>
//                 {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => <option key={d} value={String(d)}>{d}</option>)}
//               </select>
//               <select value={form.dobMonth} onChange={(e) => setForm({ ...form, dobMonth: e.target.value })} className="p-2 border rounded w-1/3">
//                 <option value="">MM</option>
//                 {months.map((m, idx) => <option key={m} value={String(idx + 1)}>{m}</option>)}
//               </select>
//               <input value={form.dobYear} onChange={(e) => setForm({ ...form, dobYear: e.target.value.replace(/[^\d]/g, '').slice(0,4) })} placeholder="YYYY" className="p-2 border rounded w-1/3" />
//             </div>

//             <div className="mt-2 text-sm">
//               {age !== null && (
//                 <span className={`font-medium ${age < 16 ? 'text-red-600' : age > 18 ? 'text-yellow-700' : 'text-green-700'}`}>
//                   Age: {age} year{age === 1 ? '' : 's'}
//                 </span>
//               )}
//               {dobError && <div className="text-sm text-red-600 mt-1">{dobError}</div>}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Street Address *</label>
//             <input value={form.streetAddress} onChange={(e) => setForm({ ...form, streetAddress: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Apartment, suite, etc.</label>
//             <input value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//         </div>

//         {/* Remaining fields */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">City *</label>
//             <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">State *</label>
//             <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">ZIP *</label>
//             <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/[^\d]/g, '').slice(0, 5) })} className="w-full p-2 border rounded" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Phone *</label>
//             <input
//               value={form.phone}
//               onChange={(e) => handlePhoneChange(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Enter 10 digits, no dashes or spaces"
//               inputMode="numeric"
//             />
//             {phoneFormatError && <div className="text-sm text-red-600 mt-1">{phoneFormatError}</div>}
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Confirm Phone *</label>
//             <input value={confirmPhone} onChange={(e) => handleConfirmPhoneChange(e.target.value)} className="w-full p-2 border rounded" placeholder="Re-enter phone" inputMode="numeric" />
//             {confirmPhoneError && <div className="text-sm text-red-600 mt-1">{confirmPhoneError}</div>}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Email *</label>
//             <input value={form.email} onChange={(e) => handleEmailChange(e.target.value)} type="email" className="w-full p-2 border rounded" />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Confirm Email *</label>
//             <input value={confirmEmail} onChange={(e) => handleConfirmEmailChange(e.target.value)} type="email" className="w-full p-2 border rounded" />
//             {confirmEmailError && <div className="text-sm text-red-600 mt-1">{confirmEmailError}</div>}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Preferred Contact Method *</label>
//             <select value={form.contactMethod} onChange={(e) => setForm({ ...form, contactMethod: e.target.value })} className="w-full p-2 border rounded">
//               <option value="">Select</option>
//               <option value="Phone">Phone</option>
//               <option value="Email">Email</option>
//             </select>
//           </div>

//           <div />
//           <div />
//         </div>

//         <div>
//   <label className="block mb-2 font-medium">Mandatory Documentation (select one) *</label>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//     {VERIFICATION_CHOICES.map((choice) => {
//       const isSelected = verificationType === choice;

//       // Determine error for this field
//       const hasError =
//         isSelected &&
//         (
//           (choice !== "Student ID" && !idNumbers[choice]) ||
//           (choice === "Student ID" &&
//             (!idNumbers.student_school || !idNumbers.student_id))
//         );

//       return (
//         <div key={choice} className="flex items-start gap-3">
//           <label className="inline-flex items-center gap-2 w-full">
//             <input
//               type="radio"
//               name="verification"
//               value={choice}
//               checked={isSelected}
//               onChange={() => {
//                 setVerificationType(choice);
//                 setErrors({}); // clear errors on change

//                 setIdNumbers((prev) => {
//                   const copy = { ...prev };
//                   if (choice !== "Student ID") {
//                     delete copy["student_school"];
//                     delete copy["student_id"];
//                   }
//                   return copy;
//                 });
//               }}
//             />
//             <span>{choice}</span>
//           </label>

//           {/* Single ID input */}
//           {isSelected && choice !== "Student ID" && (
//             <input
//               type="text"
//               placeholder={
//   choice === 'State-Issued (DMV) Driver’s License or ID' ||
//   choice === 'Federal Issued License or ID'
//     ? 'License/ID Number'
//     : `${choice} Number`
// }

//               value={idNumbers[choice] || ""}
//               onChange={(e) =>
//                 setIdNumbers((prev) => ({
//                   ...prev,
//                   [choice]: e.target.value,
//                 }))
//               }
//               className={`ml-4 p-2 border rounded ${
//                 hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300"
//               }`}
//               onBlur={() => {
//                 if (!idNumbers[choice]) {
//                   setErrors((prev) => ({ ...prev, [choice]: true }));
//                 }
//               }}
//             />
//           )}

//           {/* Student ID (two fields) */}
//           {isSelected && choice === "Student ID" && (
//             <div className="ml-4 flex flex-col gap-2 w-full">
//               <input
//                 type="text"
//                 placeholder="College / School Name"
//                 value={idNumbers["student_school"] || ""}
//                 onChange={(e) =>
//                   setIdNumbers((prev) => ({
//                     ...prev,
//                     student_school: e.target.value,
//                   }))
//                 }
//                 className={`p-2 border rounded ${
//                   hasError && !idNumbers.student_school
//                     ? "border-red-500 focus:ring-red-500"
//                     : "border-gray-300"
//                 }`}
//                 onBlur={() => {
//                   if (!idNumbers.student_school) {
//                     setErrors((prev) => ({ ...prev, student_school: true }));
//                   }
//                 }}
//               />

//               <input