var express = require('express');
var infoLog = require('debug')('info');
var debugLog = require('debug')('debug');
var path = require('path');
var logger = require('morgan');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
 
// var emailProps = require('srcnode/emailProperties');
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: emailProps.email,
//         pass: emailProps.password
//     }
// });

var server = express();

// server.use(bodyParser.json())

server.use(logger('dev'));

//---------
// supply assetsDir from cmdLine to alter dir used to serve assets from
var assetsDir = process.argv[2];

var assetsPath = '';
if(assetsDir) {
    assetsPath = path.join(__dirname,  assetsDir);
    server.use('/', express.static(assetsPath));
} else {
    assetsPath = path.join(__dirname,  'app/');
    server.use('/', express.static(assetsPath));
}
debugLog("Serving assets from '%s' on /", assetsPath);
//---------

server.post('/contactus', function(req, res){
    console.log('in /contactus');

    // var name = req.body.name;
    // var email = req.body.email;
    // var msg = req.body.message;

    // var mailOpts = {
    //     from: email,
    //     to: emailProps.email,
    //     subject: 'Contact us form submission',
    //     text: "Message from " + name + ":\n\n" + msg
    // }

    // transporter.sendMail(mailOpts, function(error, info) {
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         console.log('Message sent: ' + info.response);
    //     }
    //     
    // });
    
    res.send('Oki');
});

var listener = server.listen(3000);
infoLog('Listening on port %s', listener.address().port);



