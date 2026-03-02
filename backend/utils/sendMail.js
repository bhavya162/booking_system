require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // must be false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully to:", to);
  } catch (error) {
    console.log(process.env.EMAIL);
    console.log(process.env.EMAIL_PASS);
    console.log("❌ Email error:", error);
  }
};

module.exports = sendMail;
