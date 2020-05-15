import React, { FC } from 'react';
import AlertIcon from './alert.svg';
import * as S from './styles';

type ErrorComponentTypes = {
    message: string;
};

export const ErrorComponent: FC<ErrorComponentTypes> = ({ message }) => (
    <S.Wrapper data-testid="errorComponent">
        <S.Image src={AlertIcon} alt="alert" />
        <S.Message>{message}</S.Message>
    </S.Wrapper>
);
