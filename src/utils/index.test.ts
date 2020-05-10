import { getValueFromRates } from '.';
import { EUR, GBP, USD } from '../constants';

const rates = {
    GBP: 0.5,
    EUR: 2,
};

describe('getValueFromRates function', () => {
    it.each`
        from   | to     | value | expected
        ${USD} | ${GBP} | ${10} | ${10 * rates.GBP}
        ${USD} | ${EUR} | ${20} | ${20 * rates.EUR}
        ${GBP} | ${USD} | ${10} | ${10 / rates.GBP}
        ${EUR} | ${USD} | ${25} | ${25 / rates.EUR}
        ${GBP} | ${EUR} | ${10} | ${(10 / rates.GBP) * rates.EUR}
        ${EUR} | ${GBP} | ${20} | ${(20 / rates.EUR) * rates.GBP}
    `('should exchange $value $from to $to correctly', ({ expected, from, to, value }) => {
        const result = getValueFromRates(from, to, rates, value);
        expect(result).toEqual(expected);
    });
});
