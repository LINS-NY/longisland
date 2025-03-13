import nodemailer from 'nodemailer';
import transporter from '../../lib/email'; // Import the existing transporter

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    // Validate email and OTP
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: email, // Recipient email address
      subject: 'Your OTP for Donation Verification', // Email subject
      text: `Your OTP is: ${otp}`, // Plain text body
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`, // HTML body
    };

    try {
      console.log('Sending email to:', email); // Debugging
      console.log('Mail options:', mailOptions); // Debugging

      // Send the email using the existing transporter
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response); // Debugging

      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Debugging
      res.status(500).json({ message: 'Failed to send OTP' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}