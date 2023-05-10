const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
  
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});
  
app.post('/contact', (req, res) => {
    // Create a transporter object with your SMTP settings.
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'carsonace136@gmail.com',
            pass: 'ftmoicyqsdszksbq'
        }
    })
    // A mail option
    let mailOptions = {
        from: req.body.email,
        to: 'carsonace136@gmail.com',
        subject: 'Someone just Contacted you from your Portfolio.',
        html: `<p>Name: ${req.body.name} ${req.body.lname}</p><p>Email: ${req.body.email}</p><p>Message: ${req.body.message}</p>`
    }
    // Sending the email.
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + '/public/error.html')
          } else {
            console.log(info);
            res.sendFile(__dirname + '/public/thank-you.html');
          }
    })
})
// Starting the server.
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT} !!!`)
})