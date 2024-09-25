import { google } from "googleapis";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const sendMail = async (OTP) => {
  try {
    const accessToken = "ya29.a0AcM612yLB4fMU791ihYlLkE0L6N9A1AL3bjzpmTomUa2mDPG2GUmf0QZzX4R7ecz9_M4QJJV9NyAiUJhxzjAi3p0dMv_nMKcsBMdOA0RDM_rciQ6dKerWPjUJvyc0wRqfoTCn3Mr5t5NZVhf03cxXrJu3zxLqUaDLtwgUDXSaCgYKAY4SARISFQHGX2MiE4qieuMVcelISz0eNiW0zQ0175"
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        type: "OAUTH2",
        user: "nguyenvanduy2121999@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    let info = await transport.sendMail({
      from: '"NODEMAILER API WEB" <nguyenvanduy2121999@gmail.com>',
      to: "nguyenvanduy2121999@gmail.com",
      subject: "MESSAGE OTP",
      text: "Hello,",
      html: `Your OTP : ${OTP} and it will expire in 5 minutes`,
    });
    console.log(info)
  } catch (err) {
    console.log(err);
  }
};
sendMail()
export default sendMail

