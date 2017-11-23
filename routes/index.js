var express = require('express');
var router = express.Router();
var path = require('path');
var appRoot = require('app-root-path');
appRoot = appRoot.toString();
var nodemailer = require('nodemailer'),
    hbs = require('nodemailer-express-handlebars');
/* GET home page. */
router.get('/', function(req, res, next) {

    let sendLinkMail = (emailReceive, AppName, FullName, checkFile) => {
        return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({ // config mail server
                host: 'smtp.gmail.com',
                // port:'465',
                auth: {
                    user: 'no-reply@taydotech.com',
                    pass: 'taydotech!@#deployapp'
                }
            });
            transporter.use('compile', hbs({
                viewPath: path.join(appRoot, 'views'),
                extName: '.ejs'
            }));

            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Administrator',
                to: emailReceive,
                subject: 'Notification from Adminitrator',
                template: 'mail',
                context: {
                    AppName,
                    FullName,
                    checkFile
                }
            }
            transporter.sendMail(mainOptions, function(err, info) {
                if (err) {
                    return reject(err);
                }
                console.log('info mail: ' + info);
                console.log('info mail 2: ' + JSON.stringify(info));
                resolve('Message sent: ' + info.response);

            });
        });
    }
    return sendLinkMail('hieu.ric@gmail.com', 'Download File', 'Hoang Le', true).then(() => {
        return res.render('index', { title: 'Express' });
    })

});

module.exports = router;