const { Server } = require('socket.io');
const https = require('https');
const keys = require('../config/values');
const socketEvents = require('./socketEvents');
let socketserver2 = null;
let socketServer = () => {
	if (keys.PROD) {
		socketserver2 = https.createServer(keys.certificates).listen(keys.portSocket);
		io = new Server({
			cors: {
				origin: keys.DOMAINURL,
				methods: ['GET', 'POST'],
			},
		});
	} else {
		socketserver2 = 3000; //SOCKETIOSERVER
		io = new Server({
			cors: {
				origin: 'http://localhost',
				methods: ['GET', 'POST'],
			},
		});
	}

	io.listen(socketserver2);
	socketEvents.startSocket(io);
	console.log('SOCKET INICIADO EN ', keys.portSocket);
};
module.exports = socketServer;
