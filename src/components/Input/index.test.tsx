import React from 'react';
import { render } from '@testing-library/react';
import { Input } from '.';

const props = {
    onChange: () => null,
    testId: '',
    type: '',
    value: 10,
};

describe('Input component', () => {
    it('should render', () => {
        const { container } = render(<Input {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
