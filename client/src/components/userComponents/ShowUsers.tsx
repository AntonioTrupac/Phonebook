import { FC, useContext } from 'react';
import { StoreContext } from '../../context/FetchContext';
import { remove } from '../../services/services';

type ShowUsersProps = {
  searchTerm: string;
};

export const ShowUsers: FC<ShowUsersProps> = (props) => {
  const contextData = useContext(StoreContext);

  const deletePerson = (_id: string) => {
    const person = contextData?.person.find((person) => person._id === _id);

    if (window.confirm('Are u sure u want to delete the user?')) {
      remove(_id, person);
      contextData?.setPersons(
        contextData?.person.filter((person) => person._id !== _id)
      );
    }
  };

  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {contextData?.person
          ?.filter((person) =>
            person?.name.toLowerCase().includes(props.searchTerm.toLowerCase())
          )
          .map((person) => {
            const id = Math.random() * 10000;
            return (
              <li key={`ime-${id}`}>
                {person?.name} - {person?.number}{' '}
                <button onClick={() => deletePerson(person._id)}>
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
