import React, { FC, useContext } from 'react';
import { AccountsContextType } from '../../types';
import { currencies } from '../../constants';
import { AccountsContext } from '../ProviderAccounts';
import * as S from './styles';

export const PageHome: FC = (): JSX.Element => {
    const { accounts } = useContext<AccountsContextType>(AccountsContext);

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
