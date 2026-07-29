import nodeMailer from 'nodemailer';

export const  sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for 587 (uses STARTTLS)
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions);
};

        