import React, { FC } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { EUR, GBP, USD } from '../../constants';
import { AccountsType, RatesType } from '../../types';
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

            <S.Text>Current rate: £1 = ${rates[currencyTo]}</S.Text>

            <S.Grid>
                <Select
                    options={dropdownOptions}
                    onChange={handleDropdownChange('from')}
                    value={{ label: currencyFrom, value: currencyFrom }}
                />

                <S.Input value={exchangeFromValue} type="number" onChange={handleExchangeFromChange} />

                <S.GridText>Balance: {accounts[currencyFrom]}</S.GridText>

                <Select
                    options={dropdownOptions}
                    onChange={handleDropdownChange('to')}
                    value={{ label: currencyTo, value: currencyTo }}
                />

                <S.Input value={exchangeToValue} type="number" onChange={handleExchangeToChange} />

                <S.GridText>Balance: {accounts[currencyTo]}</S.GridText>
            </S.Grid>

            <button type="button" onClick={handleExchange}>
                Exchange
            </button>

            <button type="button" onClick={handleSwap}>
                Swap
            </button>

            {updatedDate && <p>Rates last updated at {format(updatedDate, 'PPpp')}</p>}
        </S.Wrapper>
    );
};
