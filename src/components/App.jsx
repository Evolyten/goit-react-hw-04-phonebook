import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import ContactForm from './ContactBook/ContactForm/ContactForm';
import ContactList from './ContactBook/ContactList/ContactList';
import Filter from './ContactBook/Filter/Filter';
import css from './ContactBook/ContactBook.module.css';
import Section from './ContactBook/Section/Section';

const USER_KEY = 'reader_item_contacts';

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem(USER_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = userData => {
    if (contacts.some(formData => formData.name === userData.name)) {
      toast.error(`${userData.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [...prevState, { ...userData, id: nanoid(5) }]);
  };

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const deleteUser = userId => {
    setContacts(prevState => {
      return prevState.filter(user => user.id !== userId);
    });
  };

  const filterUsers = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div className={css.contact_wrap}>
      <Section title="Phonebook">
        <ContactForm onSubmitForm={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter filteredUsers={handleChangeFilter} />
        {!!contacts.length && (
          <ContactList users={filterUsers()} onDeleteUser={deleteUser} />
        )}
      </Section>
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}
