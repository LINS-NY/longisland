import sgMail from '@sendgrid/mail';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, message } = req.body;

    // Email options
    const msg = {
      to: 'longislandnepalese@gmail.com', // Recipient's email address
      from: process.env.EMAIL_USER, // Verified sender email address
      subject: `Inquiry from LINS Website: ${subject}`, // Email subject
      text: `You have received a new message through the LINS website. Please review the details below and respond to it at your earliest convenience to ensure timely communication and resolution.\n\n
             Sender's Email: ${email}\n
             Subject: ${subject}\n
             Message: ${message}`, // Plain text body
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #1e3a8a;">Inquiry from LINS Website</h2>
          <p>You have received a new message through the LINS website. Please review the details below and respond to it at your earliest convenience to ensure timely communication and resolution.</p>
          <ul>
            <li><strong>Sender's Email:</strong> ${email}</li>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
        </div>
      `, // HTML body
    };

    try {
      // Send the email using SendGrid
      await sgMail.send(msg);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}