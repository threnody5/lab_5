// load the built-in http module
//let http = require("http");

// load the add-in express module
let express = require("express");

let fs = require("fs");

var URL;

fs.readFile('urls.txt', {encoding: 'utf8'}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        URL = data;
        console.log(URL);
    }
})

var jsObject;

const getJSON = (URL) => {

}

// let URLString = URL.toString();

// console.log(URLString);

// load the add-in xmlhttprequest and create XMLHttpRequest object
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// create app object from express() constructor
let app = express();

// create a port number
let port = process.env.PORT || 1337;

// create a "get" event handler function
// request and response object references (req, res)
app.get("/", function (reqNode, resNode) {
    var test = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.open('GET', 'https://gd2.mlb.com/components/game/mlb/year_2018/month_07/day_08/master_scoreboard.json');
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
                jsObject = JSON.parse(req.responseText);
                console.log(jsObject);
            }
            else {
                reject(req.statusText);
            }
        };

        req.onerror = function () {
            reject("network error");
        };

        req.send();
    });

    test.then(
        function (response) {
            // send JSON string back to browser
            resNode.send(response);
            // fs.writeFile()
        },
        function (error) {
            console.error("Request failed: ", error);
        }
    );
});

// start the server
app.listen(port, function () {
    console.log('web server running on port: ' + port);
});