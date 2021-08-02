import { persons } from '../data/persons';

export const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;

  return maxId + 1;
};
