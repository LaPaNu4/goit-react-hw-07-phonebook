import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'Redux/contactsSlice';
import { nanoid } from 'nanoid';
import { selectContacts } from 'Redux/selector';

function ContactForm() {
    const contacts = useSelector(selectContacts);
  const [contact, setContact] = useState({
    name: '',
    number: '',
  });
  const { name, number } = contact;
  const dispatch = useDispatch();

  const handleChange = event => {
    setContact({
      ...contact,
      id: nanoid(),
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert('This contact already exists in the phone book!!');
      return;
    }

    dispatch(addContact(contact));
    setContact({
      name: '',
      number: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Number:
        <input
          type="text"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}

export default ContactForm;
