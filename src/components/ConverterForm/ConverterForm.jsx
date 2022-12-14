// TODOS add a flag to each country in the list
// TODOS fix in the input so that 0 is added before the comma
// TODOS make an adaptive site

import css from './ConverterForm.module.css';
import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';

import axios from 'axios';
import { Submit } from './Submit/Submit';
import { Form } from './Form/Form';

import * as api from '../../refs/refsApi';

export const ConverterForm = () => {
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [allList, setAllList] = useState([]);
  const [amount, setAmount] = useState(1);
  const [exchange, setExchange] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const mapCurrencyData = async () => {
      const currencyData = await getCurrencyData();
      const countriesData = await getCountriesData();
      let countryListWithFlag = currencyData.currencies?.map(obj => {
        let countryFlag = countriesData.find(country => {
          if (country.currencies) {
            return Object.keys(country.currencies)[0] === obj.iso;
          }
          return false;
        });
        if (!countryFlag) {
          return {
            ...obj,
            // flag: flag,
          };
        }

        return { ...obj };
      });

      if (countryListWithFlag.length > 0) {
        setOptions(
          countryListWithFlag.map(obj => {
            if (obj.iso === 'UAH') {
              setSelectedFrom({
                value: obj.iso,
                label: obj.currency_name,
              });
            }
            if (obj.iso === 'USD') {
              setSelectedTo({
                value: obj.iso,
                label: obj.currency_name,
              });
            }
            return {
              value: obj.iso,
              label: obj.currency_name,
            };
          })
        );
        setAllList(countryListWithFlag);
        setIsLoaded(false);
      }
    };
    mapCurrencyData();
  }, []);

  // Get Currency Data
  async function getCurrencyData() {
    try {
      const response = await axios.get(api.default.CURRENCY_URL, {
        auth: {
          username: api.default.USERNAME,
          password: api.default.PASSWORD,
        },
      });
      const currencies = await response.data;
      return currencies;
    } catch (err) {
      toast.error(`Unable to fetch curriencies: ${err}`);
    }
  }

  // Get Countries Data
  async function getCountriesData() {
    try {
      const response = await axios.get(api.default.COUNTRIES_URL);
      const flags = await response.data;
      return flags;
    } catch (err) {
      toast.error(`Unable to fetch country flags: ${err}`);
    }
  }

  // Submit Form
  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${api.default.CONVERSTION_URL}from=${selectedFrom.value}&to=${selectedTo.value}&amount=${amount}&decimal_places=2`,
        {
          auth: {
            username: api.default.USERNAME,
            password: api.default.PASSWORD,
          },
        }
      );

      const calculated = await response.data;
      setExchange({
        from: selectedFrom,
        to: selectedTo,
        amount: amount,
        result: calculated.to[0].mid,
      });
    } catch (err) {
      toast.error(`Unable to fetch curriencies: ${err}`);
    }
  };

  // change value in input
  const handleChange = e => {
    if (Number(e.target.value) === 0) {
      setAmount('');
      return;
    }

    setAmount(Number(e.target.value));
  };

  // Change places value in inputs
  const onClick = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };
  return (
    <>
      {isLoaded ? (
        <div className={css.Loader}>
          <RotatingLines
            strokeColor="#4fa94d"
            strokeWidth="5"
            animationDuration="0.75"
            width="56"
            visible={true}
          />
        </div>
      ) : (
        <div className={css.FormContainer}>
          <div className={css.Wrapper}>
            <h1 className={css.Title}>Currency Exchanger</h1>
            <form className={css.Form} onSubmit={onSubmit}>
              <Form
                amount={amount}
                handleChange={handleChange}
                setSelectedFrom={setSelectedFrom}
                selectedFrom={selectedFrom}
                setSelectedTo={setSelectedTo}
                selectedTo={selectedTo}
                options={options}
                onClick={onClick}
              />
              <Submit
                exchange={exchange}
                amount={amount}
                selectedFrom={selectedFrom}
                selectedTo={selectedTo}
              />
            </form>
          </div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      )}
    </>
  );
};
