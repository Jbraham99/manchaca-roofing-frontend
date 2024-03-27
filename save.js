const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const corsMiddleware = require("./cors-middleware");
const path = require("path")

const app = express();
const port = 3000;

app.set("port", port);
const server = http.server(app);

//Use CORS middleware
app.use(corsMiddleware);

// parse JSON bodies
app.use(bodyParser.json());

//Handle POST request to send email
app.post("/send-email", (req, res)=>{
    const {fullName, email, phone, streetAdress, city} = req.body;

    //Create SMTP transporter
    const transporter = nodemailer.createTransport(
        {
            service: "Gmail",
            auth: {
                user: "braham.joseph15@gmail.com",
                pass: "165451Jb"
            },
            debug: true
        });
        //Email options
        const mailOptions = {
            from: `${email}`,
            to: "braham.joseph15@gmail.com",
            subject: "🔍Roof Quote Requested🔎",
            text: `Full Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${streetAddress}\nCity: ${city}`
        }
        console.log(mailOptions.text)
        //send email
        transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.error(error);
                res.sendStatus(500);//internal server error
            } else {
                console.log("Email sent: " + info.response);
                res.sendStatus(200)//ok
            }
        })
        
        //Start server
    });
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
    
