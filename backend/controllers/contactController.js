import { sendEmail } from "../utils/sendEmail.js";

export const submitInquiry = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide your name, email, and message."
            });
        }

        const emailMessage = `
You have received a new inquiry from your EasyCart Contact Us page:

Name: ${name}
Email: ${email}

Message:
${message}
        `;

        await sendEmail({
            email: process.env.SMTP_MAIL, // Send to the store owner's email
            subject: `New Inquiry from ${name}`,
            message: emailMessage,
        });

        res.status(200).json({
            success: true,
            message: "Your inquiry has been submitted successfully! We will get back to you soon.",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
