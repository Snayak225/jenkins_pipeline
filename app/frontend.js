const port = process.env.APPPORT;
const host = process.env.HOSTNAME;
const sessionname = process.env.SESSIONNAME;

const express = require('express');
const ejs = require('ejs');
const cookieparser = require('cookie-parser');
const sa = require('superagent');

const app = new express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', ejs.renderFile);
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('frontend.ejs', { name: "", message: "", age: "", session: sessionname, host: host, port: port});
});

app.post('/getage', (req, res) => {   
    console.log(`received data ... ${req.body.name}`);
    console.log(`sending data ${req.body.name} to http://10.131.109.12:7171/age`);
    try {
        sa
            .get(`http://10.131.109.12:7171/age`)
            .end((error, response) => {
                if (error == undefined) {
                    console.log(response.text);
                    const responsejson = JSON.parse(response.text);
                    console.log(responsejson);
                    res.render('frontend.ejs', { name: req.body.name, message: "Hope we guessed right!", session: sessionname, age: responsejson.message, host: host, port: port});
                }
                else {
                    res.render('frontend.ejs', { name: req.body.name, message: "There was an error", age: req.body.age, session: sessionname, host: host, port: port});
                    console.log(error.text);
                }

            })
    }
    catch {
        console.log(`Error occured when calling http://10.131.109.12:7171/age`);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});
