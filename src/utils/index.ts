import { RatesType } from '../types';
import { EUR, GBP, USD } from '../constants';

export const getValueFromRates = (
    exchangeFrom: 'USD' | 'GBP' | 'EUR',
    exchangeTo: 'USD' | 'GBP' | 'EUR',
    rates: RatesType,
    value: number,
): number => {
    if (exchangeFrom === exchangeTo) return value;

    if (exchangeFrom === USD) {
        return value * rates[exchangeTo];
    }

    if (exchangeTo === USD) {
        return value / rates[exchangeFrom];
    }

    if (exchangeFrom === GBP) {
        const GBPToUSD = value / rates.GBP;
        return GBPToUSD * rates.EUR;
    }

    if (exchangeFrom === EUR) {
        const EURToUSD = value / rates.EUR;
        return EURToUSD * rates.GBP;
    }

    return 0;
};
