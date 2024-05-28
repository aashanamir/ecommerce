import nodemailer from "nodemailer";

export const sendEmail = async (options)=>{

  const transporter = nodemailer.createTransport({
    
    host : process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,

    auth: {
      user : process.env.SMTP_USER,
      pass : process.env.SMTP_PASSWORD,
    },

  })

  const emailOtions = {
    from : process.env.SMTP_MAIL,
    to : options.email,
    subject : options.subject,
    html : options.message,
  }

  await transporter.sendMail(emailOtions);
}