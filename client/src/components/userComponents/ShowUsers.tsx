import { Dispatch, FC, SetStateAction } from 'react';
import { remove, update } from '../../services/services';
import { Person } from '../../types';

type ShowUsersProps = {
  persons: Person[];
  searchTerm: string;
  setPersons: Dispatch<SetStateAction<Person[]>>;
};

export const ShowUsers: FC<ShowUsersProps> = (props) => {
  const deletePerson = (id: number) => {
    const person = props.persons.find((person) => person.id === id);

    if (window.confirm('Are u sure u want to delete the user?')) {
      remove(id, person);
      props.setPersons(props.persons.filter((person) => person.id !== id));
    }
  };

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {props.persons
          .filter((person) =>
            person?.name.toLowerCase().includes(props.searchTerm.toLowerCase())
          )
          .map((person) => {
            return (
              <li key={`ime-${person.id}`}>
                {person?.name} - {person?.number}{' '}
                <button onClick={() => deletePerson(person.id)}>
                  {' '}
                  delete{' '}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};
