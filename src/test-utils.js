import React from 'react';
import { render } from '@testing-library/react';
import { AccountsContext, initialAccounts } from './components/ProviderAccounts';

const customRender = (ui, accountsContextValue = {}) => {
    return render(
        <AccountsContext.Provider
            value={{
                accounts: initialAccounts,
                setAccounts: () => null,
                ...accountsContextValue,
            }}
        >
            {ui}
        </AccountsContext.Provider>,
    );
};

export * from '@testing-library/react';

export { customRender as render };
