import React from 'react';
import { render } from '@testing-library/react';
import { PageExchange, PageExchangeTypes } from '.';

const props: PageExchangeTypes = {
    accounts: { GBP: 50, USD: 50 },
    setAccounts: () => null,
};

describe('PageExchange component', () => {
    it('should render', () => {
        const { container } = render(<PageExchange {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
