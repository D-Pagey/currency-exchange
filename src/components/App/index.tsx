import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { fromUnixTime } from 'date-fns';

import { AccountsType, RatesType } from '../../types';
// import { useInterval } from '../../hooks/useInterval';
import { PageHome } from '../PageHome';
import { PageExchange } from '../PageExchange';
import { Header } from '../Header';
import { Button } from '../Button';
import * as S from './styles';

const initialAccounts = {
    EUR: 50,
    GBP: 50,
    USD: 50,
};

const App: FC = () => {
    const [rates, setRates] = useState<RatesType>();
    const [updatedDate, setUpdatedDate] = useState<Date>();
    const [accounts, setAccounts] = useState<AccountsType>(initialAccounts);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_ID}`,
        );

        setRates({ USD: 1, GBP: data.rates.GBP, EUR: data.rates.EUR });
        setUpdatedDate(fromUnixTime(data.timestamp));
    };

    useEffect(() => {
        fetchData();
    }, []);

    // useInterval(() => {
    //     fetchData();
    // }, 10000);

    return (
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />

                <Switch>
                    <Route exact path="/" component={(props: any) => <PageHome {...props} accounts={accounts} />} />
                    {rates && updatedDate && (
                        <Route
                            path="/exchange"
                            component={(props: any) => (
                                <PageExchange
                                    {...props}
                                    accounts={accounts}
                                    rates={rates}
                                    setAccounts={setAccounts}
                                    updatedDate={updatedDate}
                                />
                            )}
                        />
                    )}
                </Switch>

                <S.ButtonWrapper>
                    <Link to="/">
                        <Button secondary>Home Page</Button>
                    </Link>

                    <Link to="/exchange">
                        <Button secondary>Exchange Page</Button>
                    </Link>
                </S.ButtonWrapper>
            </S.Wrapper>
        </BrowserRouter>
    );
};

export default App;
