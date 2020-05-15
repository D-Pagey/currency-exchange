import React, { createContext, useState } from 'react';

const initialAccounts = {
    EUR: 50,
    GBP: 50,
    USD: 50,
};

export const AccountsContext = createContext({
    accounts: initialAccounts,
    setAccounts: (accounts) => null,
});

export const ProviderAccounts = ({ children }) => {
    const [accounts, setAccounts] = useState(initialAccounts);

    return (
        <AccountsContext.Provider
            value={{
                accounts,
                setAccounts,
            }}
        >
            {children}
        </AccountsContext.Provider>
    );
};
