'use client';

import React from 'react';
import { 
  Select as MuiSelect, 
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SelectProps as MuiSelectProps
} from '@mui/material';

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

type BaseSelectProps = MuiSelectProps & {
  options: Option[];
  label?: string;
  helperText?: string;
};

export const Select: React.FC<BaseSelectProps> = ({ 
  options, 
  label, 
  helperText,
  fullWidth = true,
  ...props 
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect label={label} {...props}>
        {options.map(option => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
