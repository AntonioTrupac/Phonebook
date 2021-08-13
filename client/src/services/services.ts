import axios from 'axios';

const baseURL = 'http://localhost:4000/api/persons';

// // const create = async <T>(newObject: T) => {
// //   const request = await axios.post(baseURL, newObject);
// //   return request.data;
// // };

// const update = async <T>(_id: string, newObject: T) => {
//   try {
//     const request = await axios.put(`${baseURL}/${_id}`, newObject);
//     return request.data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

const remove = async <T>(_id: string, newObject: T) => {
  const request = await axios.delete(`${baseURL}/${_id}`, newObject);
  return request.data;
};

export { remove };
