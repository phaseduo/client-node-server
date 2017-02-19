require('dotenv').config()
var watson = require('./watson'),
  bodyParser = require('body-parser'),
  youtube_dl = require('./youtube_dl'),
  path = require('path'),
  mock = require('./mock');


var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static('../build/'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/test', (req, res) => {
  res.send({ topic: 'sample', shortDescription: 'Google', description: req.body.corpus, entity: '', imgUrl: '', summary: "Apple is an American multinational technology company headquartered in Cupertino, California, a suburb of San Jose, that designs, develops." });
})

io.on('connection', function (client) {
  client.on('url', (data) => {
    console.log('data', data);
    mock.forEach(d => {
      client.emit('payload', d);
    })

    setTimeout(()=>{
      client.emit('finished');
    }, 3000)
    //  youtube_dl.getYouTubeAudio(data.url)
    //  .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), client))
  })
});

server.listen(4000, function () {
  console.log('listening on 4000');
});








/*var server = require('http').createServer();
var io = require('socket.io')('server')

io.on('connection', (client) => {
  console.log('Connected')
  client.on('url', (data) => {
     youtube_dl.getYouTubeAudio(data.url)
     .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), client))
  })
})

server.listen(8080)*/

//https://www.youtube.com/watch?v=QS8qwMna8_o
