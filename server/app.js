const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client')));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index'));
});

server.listen(PORT, function(){
	console.log(`Express server listening on port ${PORT}`)
});


const Lobby    = require('./lobby.js');
const Play     = require('./play.js')

serverSocket = socketIO(server);

serverSocket.sockets.on('connection', function(client) {
	console.log('New player has connected: ' + client.id);

	client.on('enter lobby', Lobby.onEnterLobby);
	client.on('leave lobby', Lobby.onLeaveLobby);
	client.on('create game', Lobby.onCreateGame);
	client.on('enter pending game', Lobby.onEnterPendingGame);
	client.on('leave pending game', Lobby.onLeavePendingGame);
	client.on('start game', Play.onStartGame); 
	client.on('update player position', Play.updatePlayerPosition);
	client.on('disconnect', onClientDisconnect);

	function onClientDisconnect() {
		if (this.socket_game_id == null) {
			console.log('Player was not be inside any game');
			return 
		} 

		console.log('Player was inside game');

// If game is pending then use Lobby.
Lobby.onLeavePendingGame.call(this)

// If game is non-pending then use Play.
Play.onDisconnectFromGame.call(this)
}

});