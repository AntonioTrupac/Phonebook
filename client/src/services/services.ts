import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const getAll = async () => {
  const request = await axios.get(baseURL);
  return request.data;
};

const create = async <T>(newObject: T) => {
  const request = await axios.post(baseURL, newObject);
  return request.data;
};

const update = async <T>(id: number, newObject: T) => {
  const request = await axios.put(`${baseURL}/${id}`, newObject);
  return request.data;
};

const remove = async <T>(id: number, newObject: T) => {
  const request = await axios.delete(`${baseURL}/${id}`, newObject);
  return request.data;
};

export { getAll, create, update, remove };
