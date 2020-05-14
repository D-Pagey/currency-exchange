import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GBP, USD } from '../../constants';
import { PageExchange, PageExchangeTypes } from '.';

const props: PageExchangeTypes = {
    accounts: { GBP: 50, USD: 50 },
    currencyFrom: USD,
    currencyTo: GBP,
    handleExchange: () => null,
    rates: { GBP: 0.8, USD: 1 },
    setAccounts: () => null,
    setCurrencyFrom: () => null,
    setCurrencyTo: () => null,
    updatedDate: new Date('March 10, 2019 03:24:00'),
};

describe('PageExchange component', () => {
    it('should render', () => {
        const { container } = render(<PageExchange {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call swap function when button clicked', () => {
        const setCurrencyFrom = jest.fn();
        const setCurrencyTo = jest.fn();
        const { getByText } = render(
            <PageExchange {...props} setCurrencyFrom={setCurrencyFrom} setCurrencyTo={setCurrencyTo} />,
        );

        userEvent.click(getByText('Swap'));

        expect(setCurrencyFrom).toHaveBeenCalledWith(props.currencyTo);
        expect(setCurrencyTo).toHaveBeenCalledWith(props.currencyFrom);
    });
});
