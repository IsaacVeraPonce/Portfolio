const express = require('express');
const app = express();
const https = require('https');
const path = require('path');
const socketModule = require('./modules/socket');
const values = require('./config/values');
socketModule(); //RUN THE SOCKETSERVER
app.use(express.json());
const requireHTTPS = (req, res, next) => {
	if (!req.secure && req.get('x-forwarded-proto') !== 'https' && values.PROD) {
		return res.redirect(`https://${req.get('host')}${req.url}`);
	}
	next();
};
app.get('/', requireHTTPS, (req, res) => {
	res.sendFile(values.pathPublic + 'index.html');
});
app.get('/public/:type/:file', requireHTTPS, (req, res) => {
	res.sendFile(values.pathPublic + 'assets/' + req.params.type + '/' + req.params.file);
});
app.get('/.well-known/pki-validation/:filename', (req, res) => {
	res.sendFile(path.join(__dirname + `/certificates/${req.params.filename}`));
});
// app.get(/^(.+)$/, requireHTTPS, (req, res) => {
// 	console.log('', req.params);
// 	res.sendFile(path.join(__dirname + '' + req.params[0]));
// });
if (values.PROD) {
	let options = {
		SNICallback: function (domain, cb) {
			if (values.secureContext[domain]) {
				if (cb) cb(null, values.secureContext[domain]);
				else return values.secureContext[domain];
			} else throw new Error('No keys/certificates for domain requested' + domain + ' domain');
		},
		// must list a default key and cert because required by tls.createServer()
		ca: values.certificates.ca,
		key: values.certificates.key,
		cert: values.certificates.cert,
	};
	https.createServer(options, app).listen(443, async () => {
		console.log('APLICACION INICIADA PUERTO 443');
	});
	app.listen(80, () => {
		console.log('APLICACION INICIADA PUERTO 80');
	});
} else
	app.listen(80, () => {
		console.log('APLICACION INICIADA PUERTO 80 DEVELOPMENT');
	});
