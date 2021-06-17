var {createTransport} = require("nodemailer");

var transporter = createTransport({
    service: 'gmail',
    auth: {
      user: "robinbooknotch@gmail.com", 
      pass: "fyrbyciqodmabvua",
    }
  });

  transporter.verify().then(() => {
    console.log('Ready to send emails!');
  });

  module.exports = transporter;