import { GBP, EUR, USD } from '../constants';

// sort out
export type RatesType = {
    currencies: {
        [key: string]: number;
    };
    updatedDate: Date;
};

export type AccountsType = {
    [GBP]: number;
    [USD]: number;
    [EUR]: number;
    [key: string]: number;
};

export type AccountsContextType = {
    accounts: AccountsType;
    setAccounts: (accounts: AccountsType) => null;
};

export type Currencies = 'USD' | 'EUR' | 'GBP';
