import css from './Form.module.css';

import Select from 'react-select/creatable';
import { FaExchangeAlt } from 'react-icons/fa';

export const Form = ({
  amount,
  handleChange,
  setSelectedFrom,
  selectedFrom,
  setSelectedTo,
  selectedTo,
  options,
  onClick,
}) => {
  return (
    <div className={css.Box}>
      <div className={css.Item}>
        <label htmlFor="amount" className={css.Text}>
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          pattern="-?(\d+|\d+.\d+|.\d+)([eE][-+]?\d+)?"
          className={css.Input}
          placeholder="0,00"
          name="amount"
          onChange={handleChange}
          value={amount}
        />
      </div>
      <div className={css.Item}>
        <label htmlFor="from" className={css.Text}>
          From
        </label>
        <Select
          options={options}
          name="from"
          onChange={setSelectedFrom}
          theme="#5ccc6fd2"
          value={selectedFrom}
        />
      </div>
      <div className={`${css.Item} ${css.ItemIcon}`}>
        <div className={css.IconBox}>
          <button className={css.Btn} type="button" onClick={onClick}>
            <FaExchangeAlt color="#5ccc6fac" size="2em" className={css.Icon} />
          </button>
        </div>
      </div>
      <div className={css.Item}>
        <label htmlFor="to" className={css.Text}>
          To
        </label>
        <Select
          options={options}
          name="to"
          onChange={setSelectedTo}
          theme=""
          value={selectedTo}
        />
      </div>
    </div>
  );
};
