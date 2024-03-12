const path = require('path');
const fs = require('fs');
const tls = require('tls');
let certificates = {
	ca: null,
	key: null,
	cert: null,
};
let secureContext = {};
try {
	certificates = {
		ca: fs.readFileSync('./certificates/ca_bundle.crt'),
		key: fs.readFileSync('./certificates/private.key'),
		cert: fs.readFileSync('./certificates/certificate.crt'),
	};
	secureContext = {
		'rivatty.com': tls.createSecureContext(certificates),
		'www.rivatty.com': tls.createSecureContext(certificates),
	};
} catch (error) {
	console.log('No certificates found');
}

module.exports = {
	cookieKey: 'kiFERINGASVP6125@',
	bduser: 'celstv',
	bdpassword: 'ILHR13',
	bdip: 'localhost',
	bd: 'celstv',
	public: './public/',
	src: './src/',
	root: './',
	PROD: process.env.NODE_ENV === 'production',
	DOMAINURL: process.env.DOMAINURL || 'localhost',
	portSocket: process.env.PORTSOCKET || 3000,
	pathRoot: path.join(`${__dirname}/../../`),
	pathPublic: path.join(`${__dirname}/../../public/`),
	pathSrc: path.join(`${__dirname}/../../src/`),
	mysqlConfig: {
		host: '104.128.64.229',
		user: 'kiferingas',
		password: 'kiFERINGASVP6125',
		database: 'portfolio',
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0,
	},
	certificates,
	secureContext,
};
