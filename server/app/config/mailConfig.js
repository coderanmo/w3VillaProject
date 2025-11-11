const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user:'anmolyadav95200@gmail.com',
    pass:'uumfypboizrhhmgh',
  },
});


module.exports={transporter}

