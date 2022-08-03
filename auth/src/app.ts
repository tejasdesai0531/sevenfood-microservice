import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@sevenfood/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors())

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
