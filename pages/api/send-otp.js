import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, otp } = req.body;

    // Validate email and OTP
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email content
    const msg = {
      to: email,
      from: process.env.EMAIL_USER, // Sender email address
      subject: 'Your OTP for Donation Verification', // Email subject
      text: `Your OTP is: ${otp}`, // Plain text body
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`, // HTML body
    };

    try {
      console.log('Sending email to:', email); // Debugging
      console.log('Using API key:', process.env.SENDGRID_API_KEY); // Debugging
      console.log('Sender email:', process.env.EMAIL_USER); // Debugging

      // Send the email using SendGrid
      await sgMail.send(msg);
      console.log('Email sent successfully'); // Debugging
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Debugging

      // Provide more detailed error messages
      let errorMessage = 'Failed to send OTP';
      if (error.response) {
        console.error('SendGrid response:', error.response.body); // Debugging
        if (error.response.body.errors) {
          errorMessage = error.response.body.errors
            .map((err) => err.message)
            .join(', ');
        }
      }

      res.status(500).json({ message: errorMessage, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}