// load the built-in http module
//let http = require("http");

// load the add-in express module
let express = require("express");

let fs = require("fs");

// Reads the file synchronously so the URL variable is declared before being called by the IIFE
var URL = fs.readFileSync('urls.txt', { encoding: 'utf8' }, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        URL = data;
    }
})

// load the add-in xmlhttprequest and create XMLHttpRequest object
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// create app object from express() constructor
let app = express();

// create a port number
let port = process.env.PORT || 1337;

// create a "get" event handler function
// request and response object references (req, res)

// The function expression coded as in IIFE so it's called at start up
const getJSON = (() => {

    var test = new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();

        req.open('GET', URL);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.responseText);
                jsObject = JSON.stringify(req.responseText);
            }
            else {
                reject(req.statusText);
            }
        };
        req.onerror = function () {
            reject("network error");
        };
        req.send();

        app.get("/", function (reqNode, resNode) {
            test.then(
                function (response) {
                    // Writing the returned JSON string to the JSON.txt file, and sends a message to the browser and console declaring the JSON string has been saved to the file
                    fs.writeFile('JSON.txt', jsObject, (err) => {
                        if (err) {
                            resNode.send(err);
                        }
                        resNode.send('JSON data saved to file');
                        console.log('JSON data saved to file');
                    });
                },
                function (error) {
                    console.error("Request failed: ", error);
                }
            )
        });
    });
})(URL);

// start the server
app.listen(port, function () {
    console.log('web server running on port: ' + port);
});