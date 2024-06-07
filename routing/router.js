// Importing the Express module
const express = require('express');

// Creating a router instance
const router = express.Router();

// Defining a route handler for the root path '/'
router.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
router.get('/youtube', function (req, res) {
    // Sending the 'index.html' file as a response
    res.redirect("https://www.youtube.com/watch?v=qt_abdPXoU4");
});
router.get('/blog', function (req, res) {
    // Sending the 'index.html' file as a response
    res.redirect("https://www.youtube.com/watch?v=SccSCuHhOw0");
});
router.get('/instagram', function (req, res) {
    // Sending the 'index.html' file as a response
    res.redirect("https://www.youtube.com/watch?v=I92FyknWFJg");
});


// Exporting the router instance to be used in other parts of the application
module.exports = router;