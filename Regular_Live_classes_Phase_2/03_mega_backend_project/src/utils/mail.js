import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async(options) =>{
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Task Manager',
            link: 'https://mailgen.js/'
        },
    });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.MAILTRAP_SMTP_USER,
          pass: process.env.MAILTRAP_SMTP_PASS,
        },
      });


      const mail = {
        from: process.env.MAILTRAP_SMTP_SENDER_EMAIL,
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
      };

      try {
        await transporter.sendMail(mail)
      } catch (error) {
        console.error("Email sending failed", error)
      }
}


const emailVerificarionMailGenContent = (username, verificationUrl) => {
    return {
        body:{
            name: username,
            intro: "Welcome to Task Manager! We're very excited to have you on board.",
            action: {
                instructions: "To get started with our App, please click here:",
                button: {
                    color: "#22BC66",
                    text: "Confirm your account",
                    link: verificationUrl
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}


const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
    return {
        body:{
            name: username,
            intro: "We got a request to reset your password",
            action: {
                instructions: "To change your password, please click here:",
                button: {
                    color: "#22BC66",
                    text: "Reset Password",
                    link: passwordResetUrl
                },
            },
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
}


// sendMail({
//     email:user.email,
//     subject:"test",
//     mailGenContent: emailVerificarionMailGenContent(
//         username,
//         `` // verification link
//     )
// })