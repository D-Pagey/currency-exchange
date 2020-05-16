import React, { ChangeEvent, FC, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { format, fromUnixTime } from 'date-fns';

import { useInterval } from '../../hooks/useInterval';
import { EUR, GBP, USD, currencies } from '../../constants';
import { AccountsContextType, Currencies, RatesType } from '../../types';
import { getValueFromRates } from '../../utils';
import { Button } from '../Button';
import { Input } from '../Input';
import { Loading } from '../Loading';
import { ErrorComponent } from '../ErrorComponent';
import { AccountsContext } from '../ProviderAccounts';
import * as S from './styles';

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

export const PageExchange: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [exchangeFromValue, setExchangeFromValue] = useState<number | undefined>();
    const [exchangeToValue, setExchangeToValue] = useState<number | undefined>();
    const [currencyFrom, setCurrencyFrom] = useState<Currencies>(USD);
    const [currencyTo, setCurrencyTo] = useState<Currencies>(GBP);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');
    const { accounts, setAccounts } = useContext<AccountsContextType>(AccountsContext);

    const valueTooLarge = exchangeFromValue && exchangeFromValue > accounts[currencyFrom];
    const invalidExchange =
        (exchangeFromValue && exchangeFromValue <= 0) || valueTooLarge || currencyFrom === currencyTo;

    const fetchData = async (): Promise<void> => {
        try {
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
        } catch (error) {
            setIsLoading(false);
            setIsError('An error occurred fetching the exchange rates');
        }
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

        setExchangeFromValue(undefined);
        setExchangeToValue(undefined);
    };

    const handleExchangeFromChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value.slice(1), 10);

        setExchangeFromValue(value);

        if (rates) {
            const convertedValue = getValueFromRates(currencyFrom, currencyTo, rates.currencies, value);
            setExchangeToValue(convertedValue);
        }
    };

    const handleExchangeToChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.target.value.slice(1), 10);

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
        if (exchangeFromValue && exchangeToValue) {
            const updatedAccounts = {
                ...accounts,
                [currencyFrom]: accounts[currencyFrom] - exchangeFromValue,
                [currencyTo]: accounts[currencyTo] + exchangeToValue,
            };

            setAccounts(updatedAccounts);
        }
    };

    return (
        <S.Wrapper data-testid="pageExchange">
            <S.Title>Exchange Currencies:</S.Title>

            {isLoading && <Loading isLoading />}
            {isError && <ErrorComponent message={isError} />}

            {!isError && rates && (
                <>
                    <S.ItalicSmall>(Rates last updated at {format(rates.updatedDate, 'PPpp')})</S.ItalicSmall>

                    <S.Text>
                        Current rate: {currencies[currencyFrom]}1 = {currencies[currencyTo]}
                        {getValueFromRates(currencyFrom, currencyTo, rates.currencies, 1)}
                    </S.Text>

                    <form data-testid="pageExchangeForm">
                        <S.Grid>
                            <Select
                                options={dropdownOptions}
                                onChange={handleDropdownChange('from')}
                                value={{ label: currencyFrom, value: currencyFrom }}
                            />

                            {exchangeFromValue !== undefined && <S.Operator>-</S.Operator>}

                            <Input
                                prefix={currencies[currencyFrom]}
                                onChange={handleExchangeFromChange}
                                testId="exchangeFromInput"
                                value={exchangeFromValue}
                            />

                            <S.GridText invalid={valueTooLarge}>
                                Balance: {currencies[currencyFrom]}
                                {accounts[currencyFrom]}
                            </S.GridText>

                            <Select
                                options={dropdownOptions}
                                onChange={handleDropdownChange('to')}
                                value={{ label: currencyTo, value: currencyTo }}
                            />

                            {exchangeFromValue !== undefined && <S.Operator>+</S.Operator>}

                            <Input
                                prefix={currencies[currencyTo]}
                                onChange={handleExchangeToChange}
                                testId="exchangeToInput"
                                value={exchangeToValue}
                            />

                            <S.GridText>
                                Balance: {currencies[currencyTo]}
                                {accounts[currencyTo]}
                            </S.GridText>
                        </S.Grid>

                        <S.ButtonWrapper>
                            <Button onClick={handleSwap}>Swap</Button>

                            <Button onClick={handleExchange} isDisabled={invalidExchange}>
                                Exchange
                            </Button>
                        </S.ButtonWrapper>
                    </form>
                </>
            )}
        </S.Wrapper>
    );
};
