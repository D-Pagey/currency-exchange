import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { AccountsType } from '../../types';
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
    const [accounts, setAccounts] = useState<AccountsType>(initialAccounts);

    return (
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />

                <Switch>
                    <Route exact path="/" component={(props: any) => <PageHome {...props} accounts={accounts} />} />
                    <Route
                        path="/exchange"
                        component={(props: any) => (
                            <PageExchange {...props} accounts={accounts} setAccounts={setAccounts} />
                        )}
                    />
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
