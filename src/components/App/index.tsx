import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { RatesType } from '../../types';
import * as S from './styles';

const App: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [timestamp, setTimestamp] = useState();

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_ID}`,
        );

        setRates({ GBP: data.rates.GBP, EUR: data.rates.EUR });
        setTimestamp(data.timestamp);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <S.GlobalStyle />
            <h1>Revolut Currency Exchange</h1>

            <h3>
                $1 can be exchanged into €{rates?.EUR} or £{rates?.GBP}
            </h3>
        </div>
    );
};

export default App;
