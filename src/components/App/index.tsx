import React, { FC, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { fromUnixTime, format } from 'date-fns';
import { RatesType } from '../../types';
import { EUR, GBP, USD } from '../../constants';
import { useInterval } from '../../hooks/useInterval';
import { getValueFromRates } from '../../utils';
import { Exchange } from '../Exchange';
import * as S from './styles';

type CurrencyPropsType = {
    accountValue: number;
    label: string;
    rateToUSD: number;
    value: number;
};

const App: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [updatedDate, setUpdatedDate] = useState<Date>();
    const [GBPAccount, setGBPAccount] = useState<number>(50);
    const [USDAccount, setUSDAccount] = useState<number>(50);
    const [EURAccount, setEURAccount] = useState<number>(50);
    const [currencyFrom, setCurrencyFrom] = useState<'USD' | 'EUR' | 'GBP'>(USD);
    const [currencyFromProps, setCurrencyFromProps] = useState<CurrencyPropsType>();
    const [currencyTo, setCurrencyTo] = useState<'USD' | 'EUR' | 'GBP'>(GBP);
    const [currencyToProps, setCurrencyToProps] = useState<CurrencyPropsType>();

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_ID}`,
        );

        setRates({ USD: 1, GBP: data.rates.GBP, EUR: data.rates.EUR });
        setUpdatedDate(fromUnixTime(data.timestamp));
    };

    useEffect(() => {
        fetchData();
    }, []);

    useInterval(() => {
        fetchData();
    }, 10000);

    const getCurrencyProps = useCallback(
        (currency: string): CurrencyPropsType => {
            switch (currency) {
                case USD:
                    return {
                        accountValue: USDAccount,
                        label: `USD ($${USDAccount})`,
                        rateToUSD: 1,
                        value: 0,
                    };
                case EUR:
                    return {
                        accountValue: EURAccount,
                        label: `EUR (€${EURAccount})`,
                        rateToUSD: rates!.EUR,
                        value: 0,
                    };
                default:
                    return {
                        accountValue: GBPAccount,
                        label: `GBP (£${GBPAccount})`,
                        rateToUSD: rates!.GBP,
                        value: 0,
                    };
            }
        },
        [EURAccount, GBPAccount, USDAccount, rates],
    );

    useEffect(() => {
        if (rates) {
            setCurrencyFromProps(getCurrencyProps(currencyFrom));
            setCurrencyToProps(getCurrencyProps(currencyTo));
        }
    }, [currencyFrom, currencyTo, rates, getCurrencyProps]);

    const handleSwap = (): void => {
        setCurrencyFrom(currencyTo);
        setCurrencyTo(currencyFrom);
    };

    const handleExchangeFromChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        if (currencyFromProps) setCurrencyFromProps({ ...currencyFromProps, value });
        if (currencyToProps) {
            const converted = getValueFromRates(currencyFrom, currencyTo, rates!, value);
            setCurrencyToProps({ ...currencyToProps, value: converted });
        }
    };

    const handleExchangeToChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        if (currencyToProps) setCurrencyToProps({ ...currencyToProps, value });
        if (currencyFromProps) {
            const converted = getValueFromRates(currencyTo, currencyFrom, rates!, value);
            setCurrencyFromProps({ ...currencyFromProps, value: converted });
        }
    };
    const handleExchange = () => console.log('exchanged');

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

            {rates && (
                <h3>
                    $1 can be exchanged into €{rates.EUR} or £{rates.GBP}
                </h3>
            )}

            {updatedDate && <p>Rates last updated at {format(updatedDate, 'PPpp')}</p>}

            {currencyFromProps && currencyToProps && (
                <Exchange
                    exchangeFromLabel={currencyFromProps.label}
                    exchangeFromValue={currencyFromProps.value}
                    exchangeToLabel={currencyToProps.label}
                    exchangeToValue={currencyToProps.value}
                    handleExchange={handleExchange}
                    handleExchangeFromChange={handleExchangeFromChange}
                    handleExchangeToChange={handleExchangeToChange}
                    handleSwap={handleSwap}
                />
            )}
        </div>
    );
};

export default App;
