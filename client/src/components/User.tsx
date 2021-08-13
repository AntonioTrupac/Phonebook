import { FC, useState } from 'react';
import { ShowUsers } from './userComponents/ShowUsers';
import { Form } from './userComponents/Form';
import { Search } from './userComponents/Search';

export const User: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Search setSearchTerm={setSearchTerm} />
      <Form />
      <ShowUsers searchTerm={searchTerm} />
    </>
  );
};
