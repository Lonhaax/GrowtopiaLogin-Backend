const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to log the request method and URL
app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Serve the dashboard directly when accessing the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/dashboard.html'));
});

// Respond to login attempts by closing the window
app.post('/player/growid/login/validate', (req, res) => {
    res.send('<script>window.close();</script>');
});

// Close the window script
app.post('/player/validate/close', function (req, res) {
    res.send('<script>window.close();</script>');
});

// Start the server
app.listen(5000, function () {
    console.log('Listening on port 5000');
});
