const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const EMAIL = 'pathfinderkolkata23@gmail.com'
const CLIENT_ID = '387515726045-ur9g4rqgp9f57ce7j6ko27puo4qcdff8.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const MAILING_REFRESH = '1//04Xftvq0QXt6wCgYIARAAGAQSNwF-L9IrYsPYk0fcjBrFnWLnFQHWKiLtKB7sVFcwPlXmCj8SGAQDSvv-fFomlpeqZDEJJ-ikdkk'
const auth = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    MAILING_REFRESH,
    oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    const accessToken = auth.getAccessToken();
    const smtp = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    });
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Pathfinder email verification",
        html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:orange"><span>Action required : Activate your pathfinder account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Pathfinder. To complete your registration, please confirm your account.</span></div><a href="${url}" style="width:200px;padding:10px 15px;background:orange;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br></div>`,
    };
    smtp.sendMail(mailOptions, (err, res) => {
        if (err) return err;
        return res;
    });
};
