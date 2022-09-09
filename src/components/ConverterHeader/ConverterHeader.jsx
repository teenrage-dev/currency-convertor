import css from './ConverterHeader.module.css';

import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import axios from 'axios';

const USERNAME = 'teenrage865500690';
const PASSWORD = 'nma0t2stkcis2vgvpsn0pg91ed';
const CURRENCY_HOUR_URL = 'https://xecdapi.xe.com/v1/historic_rate/period?';

export const ConverterHeader = () => {
  const [rateCurrency, setRateCurrency] = useState([]);

  useEffect(() => {
    const fetchRateCurrency = async currency => {
      const response = await axios.get(
        `${CURRENCY_HOUR_URL}from=${currency}&to=UAH&amount=1&interval=hourly&page=1&per_page=2&decimal_places=2`,
        {
          auth: {
            username: USERNAME,
            password: PASSWORD,
          },
        }
      );
      const data = await response.data;
      setRateCurrency([
        {
          from: data.from,
          to: data.to.UAH[0].mid,
        },
      ]);
      return data;
    };

    const dataFunc = async () => {
      const delay = 60 * 60 * 1000;
      setInterval(async () => {
        let dataUSD = await fetchRateCurrency('USD');
        let dataEUR = await fetchRateCurrency('EUR');
        setRateCurrency([
          {
            from: dataUSD.from,
            to: dataUSD.to.UAH[0].mid,
          },
          {
            from: dataEUR.from,
            to: dataEUR.to.UAH[0].mid,
          },
        ]);
      }, delay);
      let dataUSD = await fetchRateCurrency('USD');
      let dataEUR = await fetchRateCurrency('EUR');
      setRateCurrency([
        {
          from: dataUSD.from,
          to: dataUSD.to.UAH[0].mid,
        },
        {
          from: dataEUR.from,
          to: dataEUR.to.UAH[0].mid,
        },
      ]);
    };
    dataFunc();
  }, []);

  return (
    <div className={css.Header}>
      <div className={css.Wrapper}>
        {rateCurrency.length > 1 ? (
          <ul className={`${css.List} ${css.FadeInLeftBig}`}>
            {rateCurrency.map(({ from, to }) => {
              return (
                <li className={css.Item} key={nanoid()}>
                  <div className={css.ItemWraper}>
                    <h2 className={css.Title}>{from}</h2>
                    <p className={css.Text}>{to}</p>
                    <h2 className={css.Title}>UAH</h2>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    </div>
  );
};