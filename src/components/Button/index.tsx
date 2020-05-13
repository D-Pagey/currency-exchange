import React, { FC } from 'react';
import * as S from './styles';

export type ButtonTypes = {
    children: React.ReactNode;
};

export const Button: FC = ({ children }) => <S.Button type="button">{children}</S.Button>;
