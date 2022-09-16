import React from "react";
import shortid from "shortid";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Phonebook from "./Components/Phonebook";
import AddContacts from "./Components/AddContacts";
import Filter from "./Components/Filter";
import s from "./Components/Phonebook.module.css";

import { useState, useEffect } from "react";
import useLocaleStorage from "./Components/localStorage";
import contactEl from "./Components/contacts.json";

// class App extends React.Component {
//   state = {
//     contacts: [
//       { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
//       { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
//       { id: "id-3", name: "Eden Clements", number: "645-17-79" },
//       { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
//     ],
//     filter: "",
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem("contacts");
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = (name, number) => {
//     console.log(name, number);

//     const { contacts } = this.state;
//     const repeatName = contacts.find((contact) => {
//       return contact.name.toLowerCase() === name.toLowerCase();
//     });
//     if (repeatName) {
//       Notify.warning(`${name} is already in contacts`);
//       return;
//     }

//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//     Notify.success(`${name} is added in contacts`);
//   };

//   nameInputId = shortid.generate();

//   deleteContact = (contactId) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter(
//         (contact) => contact.id !== contactId
//       ),
//     }));
//   };

//   changeFilter = (e) => {
//     this.setState({ filter: e.target.value });
//   };

//   visibleContactCards = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleContactCards = this.visibleContactCards();

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
