import React from 'react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { render, waitFor } from '../../test-utils';
import { PageExchange } from '.';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const context = {
    accounts: { GBP: 50, USD: 50 },
    setAccounts: () => null,
};

const mockResponse = {
    data: {
        rates: {
            GBP: 0.5,
            EUR: 2,
        },
        timestamp: 1589500802,
    },
};

describe('PageExchange component', () => {
    it('should render', async () => {
        mockedAxios.get.mockResolvedValue(mockResponse);

        const { container, getByTestId } = render(<PageExchange />, context);
        await waitFor(() => expect(getByTestId('pageExchangeForm')));
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render a loading spinner initially', async () => {
        const { getByTestId } = render(<PageExchange />, context);
        await waitFor(() => getByTestId('loading'));
    });

    it('should render an error component if API throws error', async () => {
        mockedAxios.get.mockRejectedValueOnce({ error: 'API limit reached' });

        const { getByTestId } = render(<PageExchange />, context);
        await waitFor(() => getByTestId('errorComponent'));
    });

    it('should exchange the exchangeFrom value to exchangeTo value', async () => {
        mockedAxios.get.mockResolvedValue(mockResponse);

        const { getByTestId } = render(<PageExchange />, context);
        await waitFor(() => getByTestId('pageExchangeForm'));

        const inputFrom = getByTestId('exchangeFromInput') as HTMLInputElement;
        const inputTo = getByTestId('exchangeToInput') as HTMLInputElement;
        const value = '10';
        const converted = '£0.50';

        userEvent.type(inputFrom, value);

        await waitFor(() => expect(inputTo.value).toEqual(converted));
    });

    it('should exchange the exchangeTo value to exchangeFrom value', async () => {
        mockedAxios.get.mockResolvedValue(mockResponse);

        const { getByTestId } = render(<PageExchange />, context);
        await waitFor(() => getByTestId('pageExchangeForm'));

        const inputFrom = getByTestId('exchangeFromInput') as HTMLInputElement;
        const inputTo = getByTestId('exchangeToInput') as HTMLInputElement;
        const value = '10';
        const converted = '$2.00';

        userEvent.type(inputTo, value);

        await waitFor(() => expect(inputFrom.value).toEqual(converted));
    });

    it.todo('should handle swap');
    it.todo('should handle exchanging currencies');
});
