import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@sevenfood/common';
import { createOutletRouter } from './routes/new';
import { catalogueRouter } from './routes/catalogue';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors())

app.use(currentUser)

app.use(createOutletRouter)
app.use(catalogueRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
