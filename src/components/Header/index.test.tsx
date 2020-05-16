import React from 'react';
import { render } from '../../test-utils';
import { Header } from '.';

describe('Header component', () => {
    it('should render', () => {
        const { container } = render(<Header />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
