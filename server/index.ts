import express, { Request, Response } from 'express';
import { persons } from './data/persons';
import { Person } from './interface/person';
import logger from './middleware/ReguestLogger';
import cors from 'cors';
import { generateId } from './utils/generateId';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(logger);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send(`Phonebook has info for ${persons.length} people`);
});

app.get('/api/persons', (request: Request, response: Response) => {
  console.log(persons);
  response.json(persons);
});

app.get('/api/persons/:id', (request: Request, response: Response) => {
  const id = request.params.id;
  console.log('request id', id);
  const person = persons.find((person) => person.id === Number(id));
  console.log('person', person);

  person ? response.json(person) : response.status(404).end();
});

app.post('/api/persons', (request: Request, response: Response) => {
  const body: Person = request.body;
  console.log('Request body', body);

  !body.name && response.status(400).json({ error: 'Content missing' });

  const personObject = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  if (persons.find((person) => person.name === personObject.name)) {
    response.status(400).json({ error: 'name must be unique!' });
    console.log('ERROR! Name must be unique');
  }

  if (persons.every((person) => person.name !== personObject.name)) {
    if (persons.find((person) => person.number === personObject.number)) {
      response.status(400).json({ error: 'ERROR! phone already exists!' });
      console.log('ERROR! Phone already exists!');
    } else {
      persons.concat(personObject);
      response.json(personObject);
      console.log(persons, personObject);
    }
  }
});

app.delete('/api/persons/:id', (request: Request, response: Response) => {
  const id = request.params.id;

  const allPersons = persons;

  allPersons.filter((person) => person.id !== Number(id));
  console.log(allPersons);
  response.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
