'use client';

import React from 'react';
import {Button as MuiButton, ButtonProps} from '@mui/material';

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'contained',
    color = 'primary',
    ...props
}) => {
    return (
        <MuiButton variant={variant} color={color} {...props}>
            {children}
        </MuiButton>
    );
};
