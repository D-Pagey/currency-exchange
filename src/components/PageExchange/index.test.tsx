import React from 'react';
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import { PageExchange, PageExchangeTypes } from '.';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const props: PageExchangeTypes = {
    accounts: { GBP: 50, USD: 50 },
    setAccounts: () => null,
};

describe('PageExchange component', () => {
    it('should render', async () => {
        const mockResponse = {
            data: {
                rates: {
                    GBP: 0.5,
                    EUR: 2,
                },
                timestamp: 1589500802,
            },
        };

        mockedAxios.get.mockResolvedValue(mockResponse);

        const { container, getByTestId } = render(<PageExchange {...props} />);
        await waitFor(() => expect(getByTestId('pageExchange')));
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a loading spinner initially', async () => {
        const { getByTestId } = render(<PageExchange {...props} />);
        await waitFor(() => getByTestId('loading'));
    });

    it('should render an error component if API throws error', async () => {
        mockedAxios.get.mockRejectedValueOnce({ error: 'API limit reached' });

        const { getByTestId } = render(<PageExchange {...props} />);
        await waitFor(() => getByTestId('errorComponent'));
    });

    it.todo('should handle swap');
    it.todo('should handle exchanging currencies');
    it.todo('should exchange from to to when typing');
    it.todo('should exchange to to from when typing');
});
