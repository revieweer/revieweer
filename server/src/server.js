import express from 'express';
import {createServer} from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import Raven from 'raven';

import routers from './routers';
import config from './config';

const app = express();
Raven.config(config.sentryDSN).install();
app.use(Raven.requestHandler());

// DB Setup
mongoose.connect(config.mongoose.uri)
.catch(err=>console.error(err));

mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routers);
app.use(errorHandler);

function errorHandler (err, req, res, next) {
    console.log('errrrr', err)
    const error = ((typeof err) == 'string' && err.search(':')>0)?err.split(':'):err;
    let [statusCode, msg] = (error.length > 1)?error:[500, err];
    (res.headersSent)?next(msg):res.status(statusCode).send(msg);
}
app.use(Raven.errorHandler());

// Server Setup
const port = process.env.PORT || 8000;
createServer(app).listen(port, ()=>{
    console.log(`\x1b[32m`, `> Server listening on ${port}`, `\x1b[0m`)
});
