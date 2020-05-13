import React, { FC } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { EUR, GBP, USD, currencies } from '../../constants';
import { AccountsType, RatesType } from '../../types';
import { getValueFromRates } from '../../utils';
import { Button } from '../Button';
import * as S from './styles';

export type PageExchangeTypes = {
    accounts: AccountsType;
    currencyFrom: string;
    currencyTo: string;
    exchangeFromLabel: string;
    exchangeFromValue: number;
    exchangeToLabel: string;
    exchangeToValue: number;
    handleExchange: () => void;
    handleExchangeFromChange: (event: any) => void;
    handleExchangeToChange: (event: any) => void;
    handleSwap: () => void;
    rates: RatesType;
    setCurrencyFrom: (currency: any) => void;
    setCurrencyFromValue: Function;
    setCurrencyTo: (currency: any) => void;
    setCurrencyToValue: Function;
    updatedDate: Date;
};

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

export const PageExchange: FC<PageExchangeTypes> = ({
    accounts,
    currencyFrom,
    currencyTo,
    exchangeFromLabel,
    exchangeFromValue,
    exchangeToLabel,
    exchangeToValue,
    handleExchangeFromChange,
    handleExchangeToChange,
    handleSwap,
    handleExchange,
    rates,
    setCurrencyFrom,
    setCurrencyFromValue,
    setCurrencyTo,
    setCurrencyToValue,
    updatedDate,
}) => {
    const handleDropdownChange = (fromOrTo: string) => (option: any) => {
        if (fromOrTo === 'from') setCurrencyFrom(option.value);
        if (fromOrTo === 'to') setCurrencyTo(option.value);

        setCurrencyFromValue(0);
        setCurrencyToValue(0);
    };

    return (
        <S.Wrapper>
            <S.Title>Exchange Currencies:</S.Title>

            <S.ItalicSmall>(Rates last updated at {format(updatedDate, 'PPpp')})</S.ItalicSmall>

            <S.Text>
                Current rate: {currencies[currencyFrom]}1 = {currencies[currencyTo]}
                {getValueFromRates(currencyFrom, currencyTo, rates, 1)}
            </S.Text>

            <S.Grid>
                <Select
                    options={dropdownOptions}
                    onChange={handleDropdownChange('from')}
                    value={{ label: currencyFrom, value: currencyFrom }}
                />

                <S.Input value={exchangeFromValue} type="number" onChange={handleExchangeFromChange} />

                <S.GridText>
                    Balance: {currencies[currencyFrom]}
                    {accounts[currencyFrom]}
                </S.GridText>

                <Select
                    options={dropdownOptions}
                    onChange={handleDropdownChange('to')}
                    value={{ label: currencyTo, value: currencyTo }}
                />

                <S.Input value={exchangeToValue} type="number" onChange={handleExchangeToChange} />

                <S.GridText>
                    Balance: {currencies[currencyTo]}
                    {accounts[currencyTo]}
                </S.GridText>
            </S.Grid>

            <S.ButtonWrapper>
                <Button onClick={handleSwap}>Swap</Button>

                <Button onClick={handleExchange}>Exchange</Button>
            </S.ButtonWrapper>
        </S.Wrapper>
    );
};
