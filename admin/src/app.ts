import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import { currentUser, errorHandler, NotFoundError } from '@sevenfood/common';
import { countryRouter } from './routes/country';
import { cityRouter } from './routes/city';
import { cuisineRouter } from './routes/cuisine';
import { restaurantTypeRouter } from './routes/restaurantType';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cors())

app.use(currentUser)

app.use(countryRouter)
app.use(cityRouter)
app.use(cuisineRouter)
app.use(restaurantTypeRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
