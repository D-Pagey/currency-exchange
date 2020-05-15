import { EUR, GBP, USD } from '../constants';

type CurrencyRatesType = {
    [key: string]: number;
};

export const getValueFromRates = (
    exchangeFrom: string,
    exchangeTo: string,
    currencyRates: CurrencyRatesType,
    value: number,
): number => {
    if (exchangeFrom === exchangeTo) return value;

    if (exchangeFrom === USD) {
        return value * currencyRates[exchangeTo];
    }

    if (exchangeTo === USD) {
        return value / currencyRates[exchangeFrom];
    }

    if (exchangeFrom === GBP) {
        const GBPToUSD = value / currencyRates.GBP;
        return GBPToUSD * currencyRates.EUR;
    }

    if (exchangeFrom === EUR) {
        const EURToUSD = value / currencyRates.EUR;
        return EURToUSD * currencyRates.GBP;
    }

    return 0;
};
