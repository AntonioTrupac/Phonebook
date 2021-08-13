import { error } from 'console';
import { FC, useContext, useState } from 'react';
import { StoreContext } from '../../context/FetchContext';

import { Input } from '../formComponents/Input';

type FormProps = {};

export const Form: FC<FormProps> = (props) => {
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [added, setAdded] = useState<boolean>(false);
  const contextData = useContext(StoreContext);
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
    };
    //FIXME: not re-rendering and showing the new number even tho its updated
    //in the back/db
    contextData?.person.filter((person) => {
      if (person?.name === personObject.name) {
        console.log('UPDATED');

        contextData?.update &&
          contextData?.update(person._id, personObject).then(() => {
            console.log('hello');
            setNewName('');
            setPhoneNumber('');
            contextData?.setPersons([
              ...contextData?.person,
              {
                ...person,
                number: phoneNumber,
              },
            ]);
            console.log(person);
            return person;
          });
      }
      return 'person'; // THIS IS STUPID
    });

    if (
      contextData?.person.every((person) => person.name !== personObject.name)
    ) {
      contextData?.create &&
        contextData?.create(personObject).then((returnedPerson) => {
          contextData?.setPersons([...contextData?.person, returnedPerson]);
          setNewName('');
          setPhoneNumber('');
          setAdded(true);
        });

      setTimeout(() => {
        setAdded(false);
      }, 2000);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addPerson(e);
  };

  return (
    <form>
      {added && <h1>User added</h1>}
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
