# faith-messenger-webhook
A Facebook Messenger webhook written in node.js for private use

# Getting Started

# Testing
Test webhook verification by:
curl -X GET "localhost:1337/webhook?hub.verify_token=<YOUR_VERIFY_TOKEN>&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

curl -X GET "https://faith-messenger-hook.azurewebsites.net/webhook?hub.verify_token=...MYTOKEN...&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"

Test webhook by:
curl -H "Content-Type: application/json" -X POST "localhost:1337/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'

curl -H "Content-Type: application/json" -X POST "https://faith-messenger-hook.azurewebsites.net/webhook" -d '{"object": "page", "entry": [{"messaging": [{"message": "TEST_MESSAGE"}]}]}'