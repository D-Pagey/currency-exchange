import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { format, fromUnixTime } from 'date-fns';

import { useInterval } from '../../hooks/useInterval';
import { EUR, GBP, USD, currencies } from '../../constants';
import { AccountsType, RatesType } from '../../types';
import { getValueFromRates } from '../../utils';
import { Button } from '../Button';
import { Loading } from '../Loading';
import * as S from './styles';

export type PageExchangeTypes = {
    accounts: AccountsType;
    setAccounts: (accounts: AccountsType) => void;
};

type Currencies = 'USD' | 'EUR' | 'GBP';

const POLLING_INTERVAL = 10000;

const dropdownOptions = [
    {
        label: EUR,
        value: EUR,
    },
    {
        label: GBP,
        value: GBP,
    },
    {
        label: USD,
        value: USD,
    },
];

export const PageExchange: FC<PageExchangeTypes> = ({ accounts, setAccounts }) => {
    const [rates, setRates] = useState<RatesType>();
    const [exchangeFromValue, setExchangeFromValue] = useState(0);
    const [exchangeToValue, setExchangeToValue] = useState(0);
    const [currencyFrom, setCurrencyFrom] = useState<Currencies>(USD);
    const [currencyTo, setCurrencyTo] = useState<Currencies>(GBP);
    const [isLoading, setIsLoading] = useState(true);

    const valueTooLarge = exchangeFromValue > accounts[currencyFrom];
    const invalidFromValue = exchangeFromValue <= 0 || valueTooLarge;

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_ID}`,
        );

        setRates({
            currencies: {
                USD: 1,
                GBP: data.rates.GBP,
                EUR: data.rates.EUR,
            },
            updatedDate: fromUnixTime(data.timestamp),
        });
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useInterval(() => {
        fetchData();
    }, POLLING_INTERVAL);

    const handleDropdownChange = (fromOrTo: string) => (option: any) => {
        if (fromOrTo === 'from') setCurrencyFrom(option.value);
        if (fromOrTo === 'to') setCurrencyTo(option.value);

        setExchangeFromValue(0);
        setExchangeToValue(0);
    };

    const handleExchangeFromChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value, 10);

        setExchangeFromValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyFrom, currencyTo, rates.currencies, value);
            setExchangeToValue(convertedValue);
        }
    };

    const handleExchangeToChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value, 10);

        setExchangeToValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyTo, currencyFrom, rates.currencies, value);
            setExchangeFromValue(convertedValue);
        }
    };

    const handleSwap = (): void => {
        setCurrencyFrom(currencyTo);
        setExchangeFromValue(exchangeToValue);

        setCurrencyTo(currencyFrom);
        setExchangeToValue(exchangeFromValue);
    };

    const handleExchange = (): void => {
        const updatedAccounts = {
            ...accounts,
            [currencyFrom]: accounts[currencyFrom] - exchangeFromValue,
            [currencyTo]: accounts[currencyTo] + exchangeToValue,
        };

        setAccounts(updatedAccounts);
    };

    if (isLoading) return <Loading isLoading />;

    if (rates) {
        return (
            <S.Wrapper>
                <S.Title>Exchange Currencies:</S.Title>

                <S.ItalicSmall>(Rates last updated at {format(rates.updatedDate, 'PPpp')})</S.ItalicSmall>

                <S.Text>
                    Current rate: {currencies[currencyFrom]}1 = {currencies[currencyTo]}
                    {getValueFromRates(currencyFrom, currencyTo, rates.currencies, 1)}
                </S.Text>

                <form>
                    <S.Grid>
                        <Select
                            options={dropdownOptions}
                            onChange={handleDropdownChange('from')}
                            value={{ label: currencyFrom, value: currencyFrom }}
                        />

                        {exchangeFromValue > 0 && <S.Operator>-</S.Operator>}

                        <S.Input value={exchangeFromValue} type="number" onChange={handleExchangeFromChange} />

                        <S.GridText invalid={valueTooLarge}>
                            Balance: {currencies[currencyFrom]}
                            {accounts[currencyFrom]}
                        </S.GridText>

                        <Select
                            options={dropdownOptions}
                            onChange={handleDropdownChange('to')}
                            value={{ label: currencyTo, value: currencyTo }}
                        />

                        {exchangeToValue > 0 && <S.Operator>+</S.Operator>}

                        <S.Input value={exchangeToValue} type="number" onChange={handleExchangeToChange} />

                        <S.GridText>
                            Balance: {currencies[currencyTo]}
                            {accounts[currencyTo]}
                        </S.GridText>
                    </S.Grid>

                    <S.ButtonWrapper>
                        <Button onClick={handleSwap}>Swap</Button>

                        <Button onClick={handleExchange} isDisabled={invalidFromValue}>
                            Exchange
                        </Button>
                    </S.ButtonWrapper>
                </form>
            </S.Wrapper>
        );
    }

    return <div />;
};
