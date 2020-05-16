import React from 'react';
import { render } from '../../test-utils';
import { PageHome } from '.';

const context = {
    accounts: {
        GBP: 50,
        USD: 50,
        EUR: 50,
    },
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome />, context);
        expect(container.firstChild).toMatchSnapshot();
    });
});
