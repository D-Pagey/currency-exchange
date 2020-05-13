import React, { FC } from 'react';
import { Logo } from '../Logo';
import * as S from './styles';

export const Header: FC = () => (
    <S.Header>
        <Logo />
    </S.Header>
);
