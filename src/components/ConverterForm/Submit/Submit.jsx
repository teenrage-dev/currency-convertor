import css from './Submit.module.css';

export const Submit = ({ exchange, amount }) => {
  return (
    <div className={css.SubmitContainer}>
      {Object.keys(exchange).length === 0 ? (
        <div className={css.SubmitItem}>
          <p className={css.SubmitText}>Lorem ipsum dolor !</p>
        </div>
      ) : (
        <h2>{exchange.result}</h2>
      )}

      <div className={css.SubmitItem}>
        <button
          type="submit"
          className={
            amount
              ? `${css.SubmitBtn}`
              : `${css.SubmitBtnDisabled} ${css.SubmitBtn}`
          }
          disabled={!amount}
        >
          Convert
        </button>
      </div>
    </div>
  );
};
