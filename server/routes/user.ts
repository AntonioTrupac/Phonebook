import { NextFunction, Request, request, Response, Router } from 'express';
import PersonModel, { IPersonModel } from '../data/schema/personModel';
import { IPerson } from '../interface/person';

const router: Router = Router();

// @route GET api/persons
// @desc get all the persons from the db
router.get('/', async (request: Request, response: Response) => {
  try {
    const person = await PersonModel.find({});
    return response.status(200).send(person);
  } catch (err) {
    console.log('ERROR WHILE GETTING DATA', err.message);
  }
});

// @route GET api/persons/:id
// @desc get single user by his id
router.get(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      console.log('ID', id);
      const person = await PersonModel.findById(id).then((person) => {
        console.log('FOUND PERSON BY ID', person);
        person ? response.json(person) : response.status(404).send;
      });

      return person;
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

// @route POST api/persons
// @desc create a person in the phonebook
router.post('/', async (request: Request, response: Response) => {
  try {
    const body: IPerson = request.body;
    console.log('Request body', body);

    !body && response.status(400).json({ error: 'Content missing' });

    const personObject = new PersonModel({
      name: body.name,
      number: body.number,
    });

    const savePerson = await personObject
      .save()
      .then((savedPerson: IPersonModel) => {
        console.log('Saved Person!!!', savedPerson);
        response.json(savedPerson);
      });

    return savePerson;
  } catch (err) {
    console.error(err.message);
  }
});

// @route PUT /api/persons/:id
// @desc update persons phone number

router.put('/:id', async (request: Request, response: Response) => {
  try {
    // const bodyNumber: IPerson = request.body.number;
    const id = request.params.id;
    console.log('Person id to update', id);

    const updatePerson = await PersonModel.findByIdAndUpdate(
      id,
      { number: request.body.number },
      { new: true }, // event handler called with the new modified document
      (err, result) => {
        if (err) {
          response.send(err);
        } else {
          console.log(result);
          response.json(result);
        }
      }
    );

    return updatePerson;
  } catch (err) {
    console.error(err.message);
  }
});

router.delete(
  '/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const deleteUser = await PersonModel.findByIdAndRemove(id).then(
        (result) => {
          console.log('Person ', result);
          response.status(204).send();
        }
      );

      return deleteUser;
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

export default router;
