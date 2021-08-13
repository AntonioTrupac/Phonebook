import axios from 'axios';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { FC, createContext, useState } from 'react';
import { Person } from '../types/types';

type Store = {
  person: Person[];
  setPersons: Dispatch<SetStateAction<Person[]>>;
  loading?: boolean;
  error?: string;
  create?: <T extends unknown>(newObject: T) => Promise<any>;
  update?: <T>(_id: string, newObject: T) => Promise<any>;
};

const StoreContext = createContext<Store | undefined>(undefined);
const baseURL = 'http://localhost:4000/api/persons';

const FetchContext = <T extends unknown, P>(
  props: T & PropsWithChildren<P>
) => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const getPersons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(baseURL);

      if (response.status === 200) {
        setPersons(response.data);
        console.log(response.data);
        setLoading(false);
      }
    } catch (err) {
      console.log('GET ERROR', err.message);
      setPersons([]);
      setLoading(false);
      setError(err.message);
    }
  }, []);

  const create = async <T,>(newObject: T) => {
    setLoading(true);
    try {
      const response = await axios.post(baseURL, newObject);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const update = async <T,>(_id: string, newObject: T) => {
    setLoading(true);
    try {
      const response = await axios.put(`${baseURL}/${_id}`, newObject);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    getPersons();
  }, [getPersons]);

  const value = useMemo(
    () => ({
      person: persons,
      setPersons,
      loading,
      error,
      create,
      update,
    }),
    [persons, error, loading]
  );

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default FetchContext;
