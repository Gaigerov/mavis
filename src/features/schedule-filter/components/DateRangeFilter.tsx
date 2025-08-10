'use client';

import {useState} from 'react';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Button} from '@/shared/components/ui/';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {ru} from 'date-fns/locale/ru';
import {FilterOptions} from '@/entities/employee/types';
import styles from './styles.module.scss';

interface DateRangeFilterProps {
    onFilter: (options: FilterOptions) => void;
}

export const DateRangeFilter = ({onFilter}: DateRangeFilterProps) => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

    const handleApply = () => {
        if (startDate && endDate) {
            onFilter({startDate, endDate, maxDays: 4});
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <div className={styles.dateFilter}>
                <DatePicker
                    label="Начальная дата"
                    value={startDate}
                    onChange={(newValue) => newValue && setStartDate(newValue)}
                    slotProps={{textField: {size: 'small'}}}
                />
                <DatePicker
                    label="Конечная дата"
                    value={endDate}
                    onChange={(newValue) => newValue && setEndDate(newValue)}
                    slotProps={{textField: {size: 'small'}}}
                    minDate={startDate}
                />
                <Button onClick={handleApply}>Применить</Button>
            </div>
        </LocalizationProvider>
    );
};
