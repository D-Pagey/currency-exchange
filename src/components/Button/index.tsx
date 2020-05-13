import React, { FC } from 'react';
import * as S from './styles';

export type ButtonTypes = {
    children: React.ReactNode;
    secondary?: boolean;
};

export const Button: FC<ButtonTypes> = ({ children, secondary }) => {
    if (secondary) return <S.SecondaryButton>{children}</S.SecondaryButton>;

    return <S.Button type="button">{children}</S.Button>;
};
