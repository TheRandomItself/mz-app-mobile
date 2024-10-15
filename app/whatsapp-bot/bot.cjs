const { Client, LocalAuth } = require('whatsapp-web.js');
const BTree = require('sorted-btree').default;
const qrcode = require('qrcode-terminal');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const PORT = 3001;
// const HOST = 'localhost'
const HOST = '192.168.50.217'

const allowedOrigins = ['http://localhost:3000', 'http://192.168.50.106:3000', 'http://192.168.50.106:3000/', 'exp://192.168.50.217:8081', 'http://192.168.50.217:8081', 'http://192.168.50.217:3001/', 'http://192.168.50.217:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
        // if (allowedOrigins.indexOf(origin) !== -1) {
        //     callback(null, true);
        // } else {
        //     callback(new Error('Not allowed by CORS')); // Reject the origin
        // }
    },
    methods: 'GET',
  };

var messages = new BTree(undefined, (a, b) => {
    if (a > b)
      return 1; 
    else
      return -1; 
  });

///////////////////////////////////////////////////////////////////////////////////////////
//                        Initializing just for testing
//                              DELETE THIS LATER
///////////////////////////////////////////////////////////////////////////////////////////
messages.set(3, { from: 'Alice', body: 'Hello', timestamp: 3 });
messages.set(2, { from: 'Bob', body: 'Hi', timestamp: 2 });
messages.set(1, { from: 'Charlie', body: 'Hey', timestamp: 1 });
messages.set(4, { from: 'Charlie', body: 'Hey', timestamp: 4 });
messages.set(10, { from: 'Charlie', body: 'Hey', timestamp: 10 });
messages.set(20, { from: 'Charlie', body: 'Hey', timestamp: 20 });
messages.set(20, { from: 'Charlie', body: 'שנקי', timestamp: 22 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקיטנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
messages.set(20, { from: 'Charlie', body: 'טנקי', timestamp: 24 });
console.log("created messages and the messages are: ")
console.log(messages)
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and display QR code for authentication
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Authenticated successfully!');
});
let previousMessage = ""
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
client.on('message', message => {

    const newMessage = {
        from: message.from,
        body: message.body,
        timestamp: message.timestamp
    };

    messages.set(newMessage.timestamp, newMessage);



    //TODO: just for testing DELETE LATER
    if (message.from.includes("[number]"))
    {
        console.log("recieved message from [number]")
        // let reversedMessage = message.body.split('').reverse().join('')
        let wordArray = message.body.split(' ')

const anotherString = '░░░░░░░░░░░█▀▀░░█░░░░░░\n' + 
'░░░░░░▄▀▀▀▀░░░░░█▄▄░░░░\n'+
'░░░░░░█░█░░░░░░░░░░▐░░░\n'+
'░░░░░░▐▐░░░░░░░░░▄░▐░░░\n'+
'░░░░░░█░░░░░░░░▄▀▀░▐░░░\n'+
'░░░░▄▀░░░░░░░░▐░▄▄▀░░░░\n'+
'░░▄▀░░░▐░░░░░█▄▀░▐░░░░░\n'+
'░░█░░░▐░░░░░░░░▄░█░░░░░\n'+
'░░░█▄░░▀▄░░░░▄▀▐░█░░░░░\n'+
'░░░█▐▀▀▀░▀▀▀▀░░▐░█░░░░░\n'+
'░░▐█▐▄░░▀░░░░░░▐░█▄▄░░\n'+
'░░░▀▀░▄░▄░▄░░░▐▄▄▄▀░░░'

    }

    console.log(`Received message: ${message.body} from ${message.from}`);
});

client.initialize();

function generateRandomMessages() {
    let messageArray = ["טנקי", "קנקי", "שנקי", "טמלוכלך", "קמלוכלך", "שמלוכלך"]
    let randomIndex = Math.floor(Math.random() * (messageArray.length))
    console.log(messageArray[randomIndex])
    return messageArray[randomIndex]

}

app.get('/:unixTime', cors(corsOptions), (req, res) => {
    const unixTime = req.params.unixTime;
 
    // console.log("entered unixtime asking for some messages")
    const timestamp = parseInt(unixTime, 10);

    if (!isNaN(timestamp)) {
        const date = new Date(timestamp);
        const currentTimeMilliseconds = new Date().getTime()
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //this is only for testing
        messages.set(timestamp + 10, { from: 'Charlie', body: generateRandomMessages(), timestamp: timestamp + 10 });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let messageRange = messages.getRange(timestamp, currentTimeMilliseconds)
        res.status(200).send(messageRange)
        // res.status(200).send(`Unix Time: ${unixTime} corresponds to ${date.toISOString()}`);
    } else {
        res.status(400).send('Invalid unixTime parameter.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
