const mysql2 = require('mysql2');
const keys = require('../config/values');
const { processQuery } = require('./processQuery');
const db = mysql2.createPool(keys.mysqlConfig);
module.exports = {
	startSocket: io => {
		io.on('connection', socket => {
			console.log('USUARIO CONECTADO SOCKET: ', socket.id);
			socket.on('saveData', async data => {
				let result = await processQuery(db, 'INSERT INTO dedications SET ?', data);
				if (result && result.insertId) socket.emit('saveData', true);
				else socket.emit('saveData', false);
			});
			socket.on('getDedications', async d => {
				let result = await processQuery(db, 'SELECT * FROM dedications WHERE deleted = 0');
				socket.emit('getDedications', result);
			});
		});
	},
};
