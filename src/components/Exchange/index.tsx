import React, { FC } from 'react';

type ExchangeTypes = {
    exchangeFromLabel: string;
    exchangeFromValue: number;
    exchangeToLabel: string;
    exchangeToValue: number;
    handleExchange: () => void;
    handleExchangeFromChange: (event: any) => void;
    handleExchangeToChange: (event: any) => void;
    handleSwap: () => void;
};

export const Exchange: FC<ExchangeTypes> = ({
    exchangeFromLabel,
    exchangeFromValue,
    exchangeToLabel,
    exchangeToValue,
    handleExchangeFromChange,
    handleExchangeToChange,
    handleSwap,
    handleExchange,
}) => {
    return (
        <div>
            <label>
                {exchangeFromLabel}
                <input value={exchangeFromValue} type="number" onChange={handleExchangeFromChange} />
            </label>

            <label>
                {exchangeToLabel}
                <input value={exchangeToValue} type="number" onChange={handleExchangeToChange} />
            </label>

            <button type="button" onClick={handleExchange}>
                Exchange
            </button>

            <button type="button" onClick={handleSwap}>
                Swap
            </button>
        </div>
    );
};
