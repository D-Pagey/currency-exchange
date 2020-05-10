import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { fromUnixTime, format } from 'date-fns';
import { RatesType } from '../../types';
import { useInterval } from '../../hooks/useInterval';
import * as S from './styles';

const App: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [updatedDate, setUpdatedDate] = useState<Date>();
    const [USDInput, setUSDInput] = useState<number>();
    const [EURInput, setEURInput] = useState<number>();
    const [GBPAccount, setGBPAccount] = useState<number>(50);
    const [USDAccount, setUSDAccount] = useState<number>(50);
    const [EURAccount, setEURAccount] = useState<number>(50);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_ID}`,
        );

        setRates({ GBP: data.rates.GBP, EUR: data.rates.EUR });
        setUpdatedDate(fromUnixTime(data.timestamp));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useInterval(() => {
        fetchData();
    }, 10000);

    const handleUSDChange = (event: any): void => {
        setUSDInput(event.target.value);
        setEURInput(event.target.value * rates!.EUR);
    };

    const handleEURChange = (event: any): void => {
        setEURInput(event.target.value);
        setUSDInput(event.target.value / rates!.EUR);
    };

    return (
        <div>
            <S.GlobalStyle />
            <h1>Revolut Currency Exchange</h1>

            <h3>Accounts:</h3>
            <ul>
                <li>USD: ${USDAccount}</li>
                <li>GBP: £{GBPAccount}</li>
                <li>EUR: €{EURAccount}</li>
            </ul>

            {rates && updatedDate && (
                <>
                    <h3>
                        $1 can be exchanged into €{rates.EUR} or £{rates.GBP}
                    </h3>

                    <label>
                        USD
                        <input value={USDInput} type="number" onChange={handleUSDChange} />
                    </label>

                    <br />

                    <label>
                        EUR
                        <input value={EURInput} type="number" onChange={handleEURChange} />
                    </label>

                    <p>Last updated at {format(updatedDate, 'PPpp')}</p>
                </>
            )}
        </div>
    );
};

export default App;
