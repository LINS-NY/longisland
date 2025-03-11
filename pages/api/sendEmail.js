import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: email, // Sender's email address
      to: 'longislandnepalese@gmail.com', // Recipient's email address
      subject: `Inquiry from LINS Website: ${subject}`, // Email subject
      text: `You have received a new message through the LINS website. Please review the details below and respond to it at your earliest convenience to ensure timely communication and resolution.\n\n
             Sender's Email: ${email}\n
             Subject: ${subject}\n
             Message: ${message}`, // Email body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}