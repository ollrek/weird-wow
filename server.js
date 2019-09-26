var express = require('express');
var request = require('request');
var serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist")); // Serve static part

// var routes = require('./apiRouter'); // Serve API part
// app.use('/api', routes);
app.use('/api', function (req, res) {
    // var url = apiUrl + req.url;
    var url = "https://www.google.com";
    req.pipe(request(url).on('error', error => {
        res.status(502).send(error.message);
    })).pipe(res);
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);