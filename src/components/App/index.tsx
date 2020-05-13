import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { fromUnixTime } from 'date-fns';

import { AccountsType, RatesType } from '../../types';
import { EUR, GBP, USD } from '../../constants';
import { useInterval } from '../../hooks/useInterval';
import { getValueFromRates } from '../../utils';
import { PageHome } from '../PageHome';
import { PageExchange } from '../PageExchange';
import { Header } from '../Header';
import * as S from './styles';

const initialAccounts = {
    EUR: 50,
    GBP: 50,
    USD: 50,
};

const App: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [updatedDate, setUpdatedDate] = useState<Date>();
    const [accounts, setAccounts] = useState<AccountsType>(initialAccounts);
    const [currencyFrom, setCurrencyFrom] = useState<'USD' | 'EUR' | 'GBP'>(USD);
    const [currencyFromValue, setCurrencyFromValue] = useState(0);
    const [currencyTo, setCurrencyTo] = useState<'USD' | 'EUR' | 'GBP'>(GBP);
    const [currencyToValue, setCurrencyToValue] = useState(0);

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

    const handleSwap = (): void => {
        setCurrencyFrom(currencyTo);
        setCurrencyFromValue(currencyToValue);

        setCurrencyTo(currencyFrom);
        setCurrencyToValue(currencyFromValue);
    };

    const handleExchangeFromChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        setCurrencyFromValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyFrom, currencyTo, rates, value);
            setCurrencyToValue(convertedValue);
        }
    };

    const handleExchangeToChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        setCurrencyToValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyTo, currencyFrom, rates, value);
            setCurrencyFromValue(convertedValue);
        }
    };

    const handleExchange = () => {
        const updatedAccounts = {
            ...accounts,
            [currencyFrom]: accounts[currencyFrom] - currencyFromValue,
            [currencyTo]: accounts[currencyTo] + currencyToValue,
        };

        setAccounts(updatedAccounts);
    };

    const getCurrencyLabel = (currency: string): string => {
        if (currency === USD) return `USD ($${accounts.USD})`;
        if (currency === EUR) return `EUR (€${accounts.USD})`;

        return `GBP (£${accounts.USD})`;
    };

    return (
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />

                <Switch>
                    <Route exact path="/" component={(props: any) => <PageHome {...props} accounts={accounts} />} />
                    <Route
                        path="/exchange"
                        component={(props: any) => (
                            <PageExchange
                                {...props}
                                currencyFrom={currencyFrom}
                                currencyTo={currencyTo}
                                exchangeFromLabel={getCurrencyLabel(currencyFrom)}
                                exchangeFromValue={currencyFromValue}
                                exchangeToLabel={getCurrencyLabel(currencyTo)}
                                exchangeToValue={currencyToValue}
                                handleExchange={handleExchange}
                                handleExchangeFromChange={handleExchangeFromChange}
                                handleExchangeToChange={handleExchangeToChange}
                                handleSwap={handleSwap}
                                setCurrencyFrom={setCurrencyFrom}
                                setCurrencyFromValue={setCurrencyFromValue}
                                setCurrencyTo={setCurrencyTo}
                                setCurrencyToValue={setCurrencyToValue}
                                updatedDate={updatedDate}
                            />
                        )}
                    />
                </Switch>

                <button type="button">
                    <Link to="/">Home</Link>
                </button>
                <button type="button">
                    <Link to="/exchange">Exchange</Link>
                </button>
            </S.Wrapper>
        </BrowserRouter>
    );
};

export default App;
