import { FC, useEffect, useState } from 'react';
import { getAll } from '../services/services';
import { Person } from '../types';
import { ShowUsers } from './userComponents/ShowUsers';
import { Form } from './userComponents/Form';
import { Search } from './userComponents/Search';

export const User: FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <>
      <Search setSearchTerm={setSearchTerm} />
      <Form persons={persons} setPersons={setPersons} />
      <ShowUsers
        persons={persons}
        searchTerm={searchTerm}
        setPersons={setPersons}
      />
    </>
  );
};
