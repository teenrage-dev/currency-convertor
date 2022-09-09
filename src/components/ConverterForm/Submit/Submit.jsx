import css from './Submit.module.css';

export const Submit = ({ exchange, amount, selectedFrom, selectedTo }) => {
  return (
    <div className={css.SubmitContainer}>
      {Object.keys(exchange).length === 0 ? (
        <div className={css.Item}>
          <p className={css.Text}>
            &#8520; This conversion uses midmarket rates!
          </p>
        </div>
      ) : (
        <div className={css.Item}>
          <p className={css.Text}>
            {amount} {selectedFrom.label} =
          </p>
          <h2 className={css.Title}>
            {exchange.result} {selectedTo.value}
          </h2>
        </div>
      )}

      <div className={css.Item}>
        <button
          type="submit"
          className={amount ? `${css.Btn}` : `${css.BtnDisabled} ${css.Btn}`}
          disabled={!amount}
        >
          Convert
        </button>
      </div>
    </div>
  );
};
