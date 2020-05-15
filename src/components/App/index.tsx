import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { ProviderAccounts } from '../ProviderAccounts';
import { PageHome } from '../PageHome';
import { PageExchange } from '../PageExchange';
import { Header } from '../Header';
import { Button } from '../Button';
import * as S from './styles';

const App: FC = () => (
    <ProviderAccounts>
        <BrowserRouter>
            <S.Wrapper>
                <S.GlobalStyle />

                <Header />

                <Switch>
                    <Route exact path="/" component={PageHome} />
                    <Route path="/exchange" component={PageExchange} />
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
    </ProviderAccounts>
);

export default App;
