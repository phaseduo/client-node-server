require('dotenv').config()
var watson = require('./watson');
var youtube_dl = require('./youtube_dl');
var path = require('path');

var express = require('express'); 

var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static('../build/'));  

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(client){
  console.log('user connected');
  client.on('url', (data) => {
      console.log('data', data);
     youtube_dl.getYouTubeAudio(data.url)
     .then(watson.watsonSpeechToText.bind(this, path.join(__dirname, 'file.flac'), client))
  })
});

server.listen(4000, function(){
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
