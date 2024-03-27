const express = require("express");
const http = require("http");
const path =  require("path");
const nodemailer = require("nodemailer");
const { set } = require("express/lib/application");

const app = express();
const server = http.Server(app);
const port = 3000;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "./contact.html")));

app.get("/", (req, res, next)=>{
    res.sendFile(path.join(__dirname, "./contact.html"))
});

app.post("/send_email", (req, res)=>{
    const {fullName, email, phone, streetAddress, city} = req.body

    console.log("****", req.body)
    console.log("&&&", `
    name: ${req.body.fullName}
    `)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'manchacaroofing@gmail.com',
            pass: 'vfoc ziuz tlej czwa'
        }
    });
    const mailOptions = {
        from: 'Quote Request',
        to: 'manchacaroofing@gmail.com',
        subject: 'Quote Request',
        text: `
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Street Address: ${streetAddress}
        City: ${city}
        `
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.log(error)
        } else {
            console.log(`Email send: ${info.response}`)
        }
        res.redirect("/")
    })
})

//init server
server.listen(port, ()=>{
    console.log(`Starting sever on port: ${port}`)
})