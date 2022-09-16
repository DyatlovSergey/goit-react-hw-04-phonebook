import s from "./Phonebook.module.css";

const Filter = ({ value, onChangeFilter }) => (
  <div className={s.filter}>
    <label className={s.filter__label}>Find contacts by name: </label>
    <input
      className={s.filter__input}
      type="text"
      value={value}
      onChange={onChangeFilter}
    />
  </div>
);

export default Filter;
