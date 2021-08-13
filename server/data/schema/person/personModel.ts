import mongoose, { Document, Model, Schema } from 'mongoose';
import { IPerson } from '../../../interface/person';
//defining the schema and the matching model

export interface IPersonModel extends Document, IPerson {}

const personSchema: Schema = new mongoose.Schema({
  name: String,
  number: String,
});

//this transforms _id from object to string
// personSchema.set('toJSON', {
//   transform: (document: any, returnedObject: any) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

//name of the model in mongo will be lowercase plural persons
const PersonModel: Model<IPersonModel> = mongoose.model('Person', personSchema);

export default PersonModel;
