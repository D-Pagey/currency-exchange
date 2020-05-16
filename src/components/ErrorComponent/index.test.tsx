import React from 'react';
import { render } from '../../test-utils';
import { ErrorComponent } from '.';

const props = {
    message: 'API limit reached',
};

describe('ErrorComponent', () => {
    it('should render', () => {
        const { container } = render(<ErrorComponent {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
