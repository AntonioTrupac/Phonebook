import mongoose from 'mongoose';
import { Person } from '../../interface/person';
//defining the schema and the matching model
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
});

//name of the model in mongo will be lowercase plural persons
const PersonModel = mongoose.model('Person', personSchema);

// const person = new Person({
//   name: 'Mario Marinici',
//   number: '0569-4555-3455',
//   id: 2,
// });

// person.save().then((result: Person) => {
//   console.log('Person Saved!', result);
//   mongoose.connection.close(); //close the connection to db
// });

//fetch the objects from the DB
//parameter in find is empty => will get all objects from the Person model
// PersonModel.find({}).then((result: any) => {
//   result.forEach((person: Person) => {
//     console.log('FETCHING PERSONS FROM DB ==>', person);
//   });
//   mongoose.connection.close();
// });

export default PersonModel;
