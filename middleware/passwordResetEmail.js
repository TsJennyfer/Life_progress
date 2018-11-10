const nodeMailer = require('nodemailer');

var passwordResetEmail = ((req, token)=>{

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,      //or 587
        secure: true,   //then false
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Life Progress App" <lifeprogress.pri@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Password reset", // Subject line
        text: process.env.EMAIL_MESSAGE, // plain text body
        html: `<b>This is your password reset link</b><br><a href="http://localhost:5000/users/resetPasswordToken/${token}">Click to reset your password.<a/><br>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        });
})

module.exports = {passwordResetEmail};