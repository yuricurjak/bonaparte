import nodemailer from 'nodemailer';

export default async (input) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: `\"${process.env.MAIL_NAME}\" <${process.env.MAIL_FROM}>`,
      to: input.email,
      subject: process.env.MAIL_SUBJECT,
      text: `Seu amigo secreto é ${input.name}`,
    }
  
    const info = await transporter.sendMail(mailOptions);
    console.log('sendMail', info)
    return info;
  } catch (err) {
    console.log(err);
    throw 'error sendMail';
  }
  

} 
