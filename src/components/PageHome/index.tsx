import React, { FC } from 'react';
import { AccountsType } from '../../types';
import * as S from './styles';

export type PageHomeTypes = {
    accounts: AccountsType;
};

export const PageHome: FC<PageHomeTypes> = ({ accounts }): JSX.Element => {
    return (
        <div>
            <S.Title>Your Account Balances:</S.Title>
            <S.List>
                <li>USD: ${accounts.USD}</li>
                <li>GBP: £{accounts.GBP}</li>
                <li>EUR: €{accounts.EUR}</li>
            </S.List>
        </div>
    );
};
