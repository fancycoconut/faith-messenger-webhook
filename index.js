'use strict';

// Import dependencies required to set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // Creates express http server

// Sets the server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening...'));

// Create the endpoint for our webhook
app.post('/webhook', (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {
            // Gets the message. entry.messaging is an array, but will only ever contain one message so we get index 0
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });

        // Return a Ok response
        res.status(200).send('EVENT_RECIEVED');
    }
    else {
        // Returns Not Found if event is not from a page subscription
        res.sendStatus(404);
    }
});

// Add support for GET requests to our webhook
app.get('/webhook', (req, res) => {
    // Your verify token
    let VERIFY_TOKEN = "...MYTOKEN...";

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }
        else {
            // Respond with Forbidden if verify tokens do not match
            res.sendStatus(403);
        }
    }
});