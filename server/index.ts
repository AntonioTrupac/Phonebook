import express from 'express';
import logger from './middleware/ReguestLogger';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './data/database';

import user from './routes/user';
import { errorHandler } from './middleware/ErrorHandling';
import { unknownEndpoint } from './middleware/UnknownEndpoint';

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(logger);

app.use('/api/persons', user);
app.use(unknownEndpoint);
app.use(errorHandler);

// app.delete('/api/persons/:id', (request: Request, response: Response) => {
//   const id = request.params.id;

//   const allPersons = persons;

//   allPersons.filter((person) => person.id !== Number(id));
//   console.log(allPersons);
//   response.status(204).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
