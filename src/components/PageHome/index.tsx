import React, { FC } from 'react';
import { AccountsType } from '../../types';
import { currencies } from '../../constants';
import * as S from './styles';

export type PageHomeTypes = {
    accounts: AccountsType;
};

export const PageHome: FC<PageHomeTypes> = ({ accounts }): JSX.Element => {
    return (
        <div>
            <S.Title>Your Account Balances:</S.Title>
            <S.List>
                {Object.keys(accounts).map((account) => (
                    <S.Item key={account}>
                        {account}: {currencies[account]}
                        {accounts[account]}
                    </S.Item>
                ))}
            </S.List>
        </div>
    );
};
