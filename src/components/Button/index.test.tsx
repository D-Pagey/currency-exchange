import React from 'react';
import { render } from '../../test-utils';
import { Button } from '.';

describe('Button component', () => {
    it('should render', () => {
        const { container } = render(<Button>Click me</Button>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
