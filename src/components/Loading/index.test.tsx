import React from 'react';
import { render } from '../../test-utils';
import { Loading } from '.';

const props = {
    isLoading: true,
};

describe('Loading component', () => {
    it('should render', () => {
        const { container } = render(<Loading {...props} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
