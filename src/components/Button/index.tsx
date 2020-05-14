import React, { FC } from 'react';
import * as S from './styles';

export type ButtonTypes = {
    children: React.ReactNode;
    isDisabled?: boolean;
    onClick?: Function;
    secondary?: boolean;
};

export const Button: FC<ButtonTypes> = ({ children, isDisabled, secondary, ...props }) => {
    if (isDisabled) {
        return (
            <S.DisabledButton disabled {...props}>
                {children}
            </S.DisabledButton>
        );
    }

    if (secondary) {
        return (
            <S.SecondaryButton type="button" {...props}>
                {children}
            </S.SecondaryButton>
        );
    }

    return (
        <S.Button type="button" {...props}>
            {children}
        </S.Button>
    );
};