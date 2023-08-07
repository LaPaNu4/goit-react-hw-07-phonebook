import axios from 'axios';

const API = 'https://64d0ffbeff953154bb79d45f.mockapi.io';

export const getContact = async () => {
  const response = await axios.get(`${API}/contacts`);
  return response.data; // Повертаємо масив контактів
};

export const postContact = async contactData => {
  const response = await axios.post(`${API}/contacts`, contactData);
  return response.data; // Повертаємо дані нового контакту
};

export const deleteContact = async id => {
  const response = await axios.delete(`${API}/contacts/${id}`);
  return response.data; // Повертаємо дані після видалення
};
