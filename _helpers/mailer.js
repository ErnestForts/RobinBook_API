var {createTransport} = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config()

var transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.mailerUser, 
      pass: process.env.mailPassword,
    }
  });

  transporter.verify().then(() => {
    console.log('Ready to send emails!');
  });

  module.exports = transporter;