import React from 'react';
import { render } from '@testing-library/react';
import { Logo } from '.';

describe('Logo component', () => {
    it('should render', () => {
        const { container } = render(<Logo />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
