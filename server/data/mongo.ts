import mongoose from 'mongoose';
import { Person } from '../interface/person';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.DB_CONNECTION!;

function connectDatabase() {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((result) => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}

export default connectDatabase;
