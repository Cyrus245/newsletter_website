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
        auth: "cyrus:8ca93a897dd2fe61594a824d0f5166cb-us11",
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