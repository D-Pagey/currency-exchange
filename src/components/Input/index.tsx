import React, { FC } from 'react';
import * as S from './styles';

type InputTypes = {
    setValue: (value: number) => void;
    value?: number | string;
    prefix?: string;
    testId?: string;
};

export const Input: FC<InputTypes> = ({ prefix, setValue, testId = 'input', value }) => {
    const handleChange = (values: { floatValue: number }): void => {
        setValue(values.floatValue);
    };

    return (
        <S.NumberFormatInput
            data-testid={testId}
            decimalScale={2}
            fixedDecimalScale
            placeholder={`${prefix}0`}
            prefix={prefix}
            thousandSeparator={true}
            onValueChange={handleChange}
            value={value}
        />
    );
};
