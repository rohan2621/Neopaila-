import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // 🔥 MUST BE FIRST

const testEmail = async () => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS ? "LOADED ✅" : "MISSING ❌"
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("SMTP connection verified ✅");

    await transporter.sendMail({
      from: `"Nodemailer Test" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "✅ Nodemailer Outlook Test",
      html: `
        <h2>It works! 🎉</h2>
        <p>Your Outlook SMTP setup is correct.</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("✅ Test email sent successfully");
  } catch (error) {
    console.error("❌ Email test failed:");
    console.error(error.message);
  }
};

testEmail();
