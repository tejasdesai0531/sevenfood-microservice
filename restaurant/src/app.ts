import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@sevenfood/common';
import { createOutletRouter } from './routes/new'


const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(currentUser)

app.use(createOutletRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
