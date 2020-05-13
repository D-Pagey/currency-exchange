import React, { FC } from 'react';
import * as S from './styles';

export type ButtonTypes = {
    children: React.ReactNode;
    onClick?: Function;
    secondary?: boolean;
};

export const Button: FC<ButtonTypes> = ({ children, secondary, ...props }) => {
    if (secondary)
        return (
            <S.SecondaryButton type="button" {...props}>
                {children}
            </S.SecondaryButton>
        );

    return (
        <S.Button type="button" {...props}>
            {children}
        </S.Button>
    );
};
