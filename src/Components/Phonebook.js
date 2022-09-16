import React from "react";
import s from "./Phonebook.module.css";

const Phonebook = ({ contacts, onDeleteContact }) => (
  <ul className={s.phonebookList}>
    {contacts.map(({ id, name, number }) => (
      <li className={s.contact__item} key={id}>
        <p className={s.contact__description}>
          <span className={s.contact__name}>{name}:</span>
          <span>{number}</span>
        </p>
        <button
          className={s.contact__delete}
          onClick={() => onDeleteContact(id)}
        >
          <span>Delete </span>
        </button>
      </li>
    ))}
  </ul>
);
export default Phonebook;
