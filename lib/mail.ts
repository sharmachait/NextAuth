import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (to: string, token: string) => {
  const subject = 'Yapper account verfication';
  const verificationLink = `${process.env.BASEADDRESS}/auth/verify?token=${token}`;
  console.log('sendingEmial');
  const from = 'chait8126@gmail.com';
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.senderemail,
      pass: process.env.POEMAILPASSWORD,
    },
  });
  const mailOptions = createOptions(from, to, subject, token, verificationLink);

  try {
    await transporter.sendMail(mailOptions);
    return { success: 'Email sent successfully.' };
  } catch (e) {
    console.log(e);
    return { error: 'failed to send email' };
  }
};

function createOptions(
  from: string,
  to: string,
  subject: string,
  token: string,
  verificationLink: string
) {
  return {
    from: from,
    to: to,
    subject: subject,
    text: `Please clink on the link below to verify your email id. \n ${verificationLink} \n your authentication token is ${token}`,
  };
}
