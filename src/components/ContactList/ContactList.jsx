import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts,  } from 'Redux/contactsSlice';
import { selectContacts, selectFilters } from 'Redux/selector';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchContacts()); // Виклик fetchContacts при монтуванні компонента
    }, [dispatch]);
  const getFilteredContacts = () => {
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts();

   const removeContactById = id => {
     dispatch(deleteContact(id));
   };

  return (
    <ul>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={() => removeContactById(contact.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
