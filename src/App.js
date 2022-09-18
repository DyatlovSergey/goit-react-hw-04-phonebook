import React from "react";
import shortid from "shortid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Phonebook from "./Components/Phonebook";
import AddContacts from "./Components/AddContacts";
import Filter from "./Components/Filter";
import s from "./Components/Phonebook.module.css";

import { useState, useEffect } from "react";
import useLocaleStorage from "./Components/localStorage";
import contactEl from "./contacts.json";

const App = () => {
  const [contacts, setContacts] = useLocaleStorage("contact", contactEl);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contacts));
  }, [contacts]);

  const filterChange = (e) => {
    setFilter(e.target.value);
  };

  const addContactCard = ({ name, number }) => {
    const repeatName = contacts.find((contact) => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });
    if (repeatName) {
      Notify.warning(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts((prev) => {
      return [contact, ...prev];
    });

    Notify.success(`${name} is added in contacts`);
  };

  const deleteContactCard = (cardId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== cardId));
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContactCards = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <section className={s.container}>
      <h1>Phonebook</h1>
      <AddContacts onAddContactCard={addContactCard} />
      <h2>Contacts</h2>
      <Filter onChangeFilter={filterChange} value={filter} />
      <Phonebook
        contacts={visibleContactCards}
        onDeleteContact={deleteContactCard}
      />
    </section>
  );
};

export default App;
