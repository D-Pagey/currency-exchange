import React, { FC, useState } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { EUR, GBP, USD, currencies } from '../../constants';
import { AccountsType, RatesType } from '../../types';
import { getValueFromRates } from '../../utils';
import { Button } from '../Button';
import * as S from './styles';

export type PageExchangeTypes = {
    accounts: AccountsType;
    rates: RatesType;
    setAccounts: (accounts: AccountsType) => void;
    updatedDate: Date;
};

type Currencies = 'USD' | 'EUR' | 'GBP';

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

export const PageExchange: FC<PageExchangeTypes> = ({ accounts, rates, setAccounts, updatedDate }) => {
    const [exchangeFromValue, setExchangeFromValue] = useState<number>(0);
    const [exchangeToValue, setExchangeToValue] = useState<number>(0);
    const [currencyFrom, setCurrencyFrom] = useState<Currencies>(USD);
    const [currencyTo, setCurrencyTo] = useState<Currencies>(GBP);

    const valueTooLarge = exchangeFromValue > accounts[currencyFrom];
    const invalidFromValue = exchangeFromValue <= 0 || valueTooLarge;

    const handleDropdownChange = (fromOrTo: string) => (option: any) => {
        if (fromOrTo === 'from') setCurrencyFrom(option.value);
        if (fromOrTo === 'to') setCurrencyTo(option.value);

        setExchangeFromValue(0);
        setExchangeToValue(0);
    };

    const handleExchangeFromChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        setExchangeFromValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyFrom, currencyTo, rates, value);
            setExchangeToValue(convertedValue);
        }
    };

    const handleExchangeToChange = (event: any): void => {
        const value = parseInt(event.target.value, 10);

        setExchangeToValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyTo, currencyFrom, rates, value);
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

    return (
        <S.Wrapper>
            <S.Title>Exchange Currencies:</S.Title>

            <S.ItalicSmall>(Rates last updated at {format(updatedDate, 'PPpp')})</S.ItalicSmall>

            <S.Text>
                Current rate: {currencies[currencyFrom]}1 = {currencies[currencyTo]}
                {getValueFromRates(currencyFrom, currencyTo, rates, 1)}
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
};