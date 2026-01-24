import Contact from "../models/contact.model.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ---------------------------
   CREATE CONTACT MESSAGE
---------------------------- */
export const createContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const contact = await Contact.create({ name, email, message });

    // 🔔 Notify admin (non-blocking)
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Message",
      html: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>${message}</p>
      `,
    }).catch((err) => {
      console.error("Admin email failed:", err.message);
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    next(err);
  }
};

/* ---------------------------
   ADMIN: GET ALL MESSAGES
---------------------------- */
export const getContacts = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

/* ---------------------------
   ADMIN: REPLY TO MESSAGE
---------------------------- */
export const replyContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({ error: "Reply message required" });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ error: "Message not found" });
    }

    contact.replied = true;
    contact.replyMessage = reply;
    contact.repliedAt = new Date();
    await contact.save();

    await sendEmail({
      to: contact.email,
      subject: "✅ Reply from Our Team",
      html: `<p>${reply}</p>`,
    });

    res.json({ message: "Reply sent successfully" });
  } catch (err) {
    next(err);
  }
};
