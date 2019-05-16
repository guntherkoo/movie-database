global.fetch = require('isomorphic-unfetch');
const fetch = global.fetch;

const express = require('express');
const nextjs = require('next');
const compression = require('compression');

const app = nextjs({ dev: process.env.NODE_ENV !== 'production' });
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app
	.prepare()
	.then(() => {
		const server = express();
		server.use(compression());

		server.get('/favicon.ico', (req, res, next) => (
			res.status(200).sendFile('favicon.ico', {root: __dirname + '/static/'})
		));

	    //server start with next routing
	    server.use(handler).listen(8888, (err) => {
	    	if (err) throw err
	    		console.log('SSR Server ready on http://localhost:8888')
	    });
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
