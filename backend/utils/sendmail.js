const nodemailer = require('nodemailer');
require('dotenv').config();

const sendmail=async(to,subject,htmlContent)=>
{
    try
    {
        const transpoter=nodemailer.createTransport(
            {
                service:'gmail',
                auth:{
                    user:process.env.EMAIL_USER,
                    pass:process.env.EMAIL_PASS,
                }
            }
        );

        await transpoter.sendMail({from : process.env.EMAIL_USER,to,subject,html:htmlContent});

        console.log("Email sent successfully");

    }
    catch(error)
    {
        console.error("❌ Email sending error:", error);
    }
}
module.exports = sendmail;