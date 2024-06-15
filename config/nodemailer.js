const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

//This part defines how the communication will take place
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587, //indicates we are using TLS
    secure: false, //true for 465, false for other ports
    auth: {
        user: 'kanhaiya.yadav.ds26@heritageit.edu.in',
        pass: '3SF6uAZP'
    },
    tls: {
        rejectUnauthorized: false
    }
});

//This part says where will the ejs file when a html email is sent.
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log('Error in rendering template', err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;
};



module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}