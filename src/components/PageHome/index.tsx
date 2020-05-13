import React, { FC } from 'react';
import { AccountsType } from '../../types';

export type PageHomeTypes = {
    accounts: AccountsType;
};

export const PageHome: FC<PageHomeTypes> = ({ accounts }): JSX.Element => {
    return (
        <div>
            <h3>Accounts:</h3>
            <ul>
                <li>USD: ${accounts.USD}</li>
                <li>GBP: £{accounts.GBP}</li>
                <li>EUR: €{accounts.EUR}</li>
            </ul>
        </div>
    );
};
