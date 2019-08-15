import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorMiddleware } from 'middlewares'
import mongoose from 'mongoose'
import logger from 'utils/logging'
import apiRouter from './router'

dotenv.config({ silent: true });

const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

app.disable('etag');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const connectionStatus = { status: 'connected' }
  logger.info('checking server connection', connectionStatus)
  res.send(connectionStatus)
})

app.use('/v1.0/vehicles', apiRouter);
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000;
app.listen(PORT);

export default app
