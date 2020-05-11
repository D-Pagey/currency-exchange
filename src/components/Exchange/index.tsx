import React, { FC } from 'react';
import Select from 'react-select';
import { EUR, GBP, USD } from '../../constants';

type ExchangeTypes = {
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
    setCurrencyFrom: (currency: any) => void;
    setCurrencyFromValue: Function;
    setCurrencyTo: (currency: any) => void;
    setCurrencyToValue: Function;
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

export const Exchange: FC<ExchangeTypes> = ({
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
    setCurrencyFrom,
    setCurrencyFromValue,
    setCurrencyTo,
    setCurrencyToValue,
}) => {
    const handleDropdownChange = (fromOrTo: string) => (option: any) => {
        if (fromOrTo === 'from') setCurrencyFrom(option.value);
        if (fromOrTo === 'to') setCurrencyTo(option.value);

        setCurrencyFromValue(0);
        setCurrencyToValue(0);
    };

    return (
        <div>
            <Select
                options={dropdownOptions}
                onChange={handleDropdownChange('from')}
                value={{ label: currencyFrom, value: currencyFrom }}
            />

            <label>
                {exchangeFromLabel}
                <input value={exchangeFromValue} type="number" onChange={handleExchangeFromChange} />
            </label>

            <Select
                options={dropdownOptions}
                onChange={handleDropdownChange('to')}
                value={{ label: currencyTo, value: currencyTo }}
            />

            <label>
                {exchangeToLabel}
                <input value={exchangeToValue} type="number" onChange={handleExchangeToChange} />
            </label>

            <button type="button" onClick={handleExchange}>
                Exchange
            </button>

            <button type="button" onClick={handleSwap}>
                Swap
            </button>
        </div>
    );
};
