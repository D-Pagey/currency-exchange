import React from 'react';
import { render } from '@testing-library/react';
import { PageHome, PageHomeTypes } from '.';

const props: PageHomeTypes = {
    accounts: {
        GBP: 50,
        USD: 50,
        EUR: 50,
    },
};

describe('PageHome component', () => {
    it('should render', () => {
        const { container } = render(<PageHome {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
