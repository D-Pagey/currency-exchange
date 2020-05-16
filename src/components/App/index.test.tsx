import React from 'react';
import { render } from '../../test-utils';
import App from '.';

describe('App component', () => {
    it('should render', () => {
        const { container } = render(<App />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
