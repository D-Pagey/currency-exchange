import React from 'react';
import { render } from '@testing-library/react';
import { GBP, USD } from '../../constants';
import { PageExchange, PageExchangeTypes } from '.';

const props: PageExchangeTypes = {
    accounts: { GBP: 50, USD: 50 },
    currencyFrom: USD,
    currencyTo: GBP,
    exchangeFromLabel: 'USD $',
    exchangeFromValue: 50,
    exchangeToLabel: 'GBP £',
    exchangeToValue: 50,
    handleExchange: () => null,
    handleExchangeFromChange: () => null,
    handleExchangeToChange: () => null,
    handleSwap: () => null,
    rates: { GBP: 0.8, USD: 1 },
    setCurrencyFrom: () => null,
    setCurrencyFromValue: () => null,
    setCurrencyTo: () => null,
    setCurrencyToValue: () => null,
    updatedDate: new Date('March 10, 2019 03:24:00'),
};

describe('PageExchange component', () => {
    it('should render', () => {
        const { container } = render(<PageExchange {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
