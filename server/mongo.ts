import mongoose from 'mongoose';
import { Person } from './interface/person';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_CONNECTION!;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: 'Mario Marinici',
  number: '0569-4555-3455',
  id: 2,
});

person.save().then((result: Person) => {
  console.log('Person Saved!', result);
  mongoose.connection.close();
});
