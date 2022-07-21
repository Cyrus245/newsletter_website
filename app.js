const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/signup.html")


})

app.post("/", (req, res) => {

    const fName = req.body.fName;
    const lName = req.body.lname;
    const email = req.body.email;
    const phone = req.body.phone;

    const data = {

        members: [

            {

                email_address: email,
                status: "subscribed",
                merge_fields: {

                    FNAME: fName,
                    LNAME: lName,
                    PHONE: phone,

                }





            }
        ]


    }

    const jasonData = JSON.stringify(data);

    const url = " https://us11.api.mailchimp.com/3.0/lists/45960cb6ee";

    options = {

        method: "POST",
        auth: "cyrus:d14a1e1d7170c434dc76aa6645bf3cbd-us11",
    }

    const request = https.request(url, options, (response) => {

        console.log(response.statusCode);
        if (response.statusCode === 200) {

            res.sendFile(__dirname + "/success.html");
        } else {

            res.sendFile(__dirname + "/failure.html")
        }
        // response.on("data", (data) => {

        //     console.log(JSON.parse(data));

        // })


    })

    request.write(jasonData);
    request.end();



})


app.post("/failure", (req, res) => {


    res.redirect('/')
})



app.listen(process.env.PORT || 3000, () => {

    console.log("server started on port 30000");



})