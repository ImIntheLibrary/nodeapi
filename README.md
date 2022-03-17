# nodeapi
Post format:

"title": "your intendd title"
"body": "your body"

using curl is the easiest method, the exact command will depend on your OS. For Raspberry Pi, it is 
curl -H “Content-Type: application/json” -X POST -d ‘{json}’ url-to-post
