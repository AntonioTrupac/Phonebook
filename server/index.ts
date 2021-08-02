import express, { request, Request, Response } from 'express';
import { persons } from './data/persons';
import { Person } from './interface/person';
import { generateId } from './utils/generateId';

const app = express();
app.use(express.json());

const PORT = 4000;

app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
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
  console.log(body);

  !body && response.status(400).json({ error: 'Content missing' });

  const personObject = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons.concat(personObject);

  response.json(personObject);
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
