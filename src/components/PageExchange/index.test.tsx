import React from 'react';
import { render } from '@testing-library/react';
import { PageExchange, PageExchangeTypes } from '.';

const props: PageExchangeTypes = {
    accounts: { GBP: 50, USD: 50 },
    rates: { GBP: 0.8, USD: 1 },
    setAccounts: () => null,
    updatedDate: new Date('March 10, 2019 03:24:00'),
};

describe('PageExchange component', () => {
    it('should render', () => {
        const { container } = render(<PageExchange {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
