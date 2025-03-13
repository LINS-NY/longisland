import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import transporter from '../../lib/email'; // Import the nodemailer transporter

// Path to save the Excel file
const filePath = path.join(process.cwd(), './src/components/Donation/LINS-Donations.xlsx');

// Function to generate a receipt number
const generateReceiptNumber = () => {
  const timestamp = Date.now().toString(); // Current timestamp
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Random 3-digit number
  return `REC-${timestamp}-${randomNum}`; // Example: REC-1698251234567-042
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, donationAmount, phone, streetAddress, city, state, zip } = req.body;

    // Generate a receipt number
    const receiptNumber = generateReceiptNumber();

    // Create the file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      const headers = [
        ['Receipt Number', 'Row Number', 'Timestamp', 'First Name', 'Last Name', 'Donation Amount', 'Email', 'Phone', 'Street Address', 'City', 'State', 'Zip']
      ];
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(headers);
      XLSX.utils.book_append_sheet(wb, ws, 'LINS-Donations');
      XLSX.writeFile(wb, filePath);
    }

    // Read the existing Excel file
    let wb;
    try {
      wb = XLSX.readFile(filePath);
    } catch (err) {
      console.error('Error reading Excel file:', err);
      return res.status(500).json({ message: 'Error reading Excel file' });
    }

    // Get the worksheet by name
    const ws = wb.Sheets['LINS-Donations'];

    // Convert the sheet to JSON format to work with it easily
    const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

    // Calculate the next row number (excluding the header row)
    const nextRowNumber = data.length;

    // Get the current timestamp
    const timestamp = new Date().toISOString();

    // Prepare the new row of data
    const newRow = [
      receiptNumber, // Auto-generated receipt number
      nextRowNumber, // Auto-incremented row number
      timestamp, // Current timestamp
      firstName,
      lastName,
      donationAmount,
      email,
      phone,
      streetAddress,
      city,
      state,
      zip
    ];

    // Append the new row to the data
    data.push(newRow);

    // Convert the updated data back to a worksheet
    const updatedWs = XLSX.utils.aoa_to_sheet(data);

    // Update the worksheet in the workbook
    wb.Sheets['LINS-Donations'] = updatedWs;

    // Write the updated workbook back to the file
    try {
      XLSX.writeFile(wb, filePath);

      // Send a thank-you email to the user
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender email address
        to: email, // Recipient email address
        subject: 'Thank You for Your Donation', // Email subject
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #1e3a8a;">Thank You, ${firstName}!</h2>
            <p>We are incredibly grateful for your generous donation of <strong>$${donationAmount}</strong>.</p>
            <p>Your support helps us continue our mission and make a meaningful impact. Here are the details of your donation:</p>
            <ul>
              <li><strong>Receipt Number:</strong> ${receiptNumber}</li>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Address:</strong> ${streetAddress}, ${city}, ${state}, ${zip}</li>
              <li><strong>Donation Amount:</strong> $${donationAmount}</li>
            </ul>
            <p>If you have any questions or need further assistance, please feel free to contact us at <a href="mailto:support@lins.org">support@lins.org</a>.</p>
            <p>Once again, thank you for your support!</p>
            <p>Warm regards,</p>
            <p><strong>The LINS Team</strong></p>
          </div>
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Return the receipt number in the response
      res.status(200).json({ message: 'Donation recorded successfully', receiptNumber });
    } catch (err) {
      console.error('Error writing to Excel file or sending email:', err);
      res.status(500).json({ message: 'Error writing to Excel file or sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}