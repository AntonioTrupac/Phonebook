import { Dispatch, FC, SetStateAction, useState } from 'react';
import { create, update } from '../../services/services';
import { Person } from '../../types';
import { Input } from '../formComponents/Input';

type FormProps = {
  persons: Person[];
  setPersons: Dispatch<SetStateAction<Person[]>>;
};

export const Form: FC<FormProps> = (props) => {
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const onChange = (e: any) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  const onPhoneChange = (e: any) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
  };

  const addPerson = (e: any) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: phoneNumber,
      id: Math.random(),
    };

    if (props.persons.some((person) => person.name === personObject.name)) {
      alert(`${newName} already exists`);
      props.setPersons(props.persons);
    }

    if (props.persons.every((person) => person.name !== personObject.name)) {
      create(personObject).then((returnedPerson) => {
        props.setPersons([...props.persons, returnedPerson]);
        setNewName('');
        setPhoneNumber('');
      });
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addPerson(e);
  };

  return (
    <form>
      <div>
        name: <Input type='text' value={newName} onChange={onChange} />
      </div>
      <div>
        number:{' '}
        <Input type='text' value={phoneNumber} onChange={onPhoneChange} />
      </div>
      <div>
        <button type='submit' onClick={onSubmit}>
          add
        </button>
      </div>
    </form>
  );
};
