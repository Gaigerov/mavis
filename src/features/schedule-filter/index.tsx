'use client';

import {DateRangeFilter} from './components/DateRangeFilter';
import {ScheduleData, FilterOptions} from '@/entities/employee/types';
import {filterShifts} from '@/entities/employee/';
import {Paper} from '@mui/material';
import styles from './styles.module.scss';

export const ScheduleFilter = ({
    data,
    onFilter,
}: {
    data: ScheduleData;
    onFilter: (data: ScheduleData) => void;
}) => {
    const handleFilter = (options: FilterOptions) => {
        const filtered = filterShifts(data, options);
        onFilter(filtered);
    };

    return (
        <Paper elevation={3} className={styles.filter} >
            <DateRangeFilter onFilter={handleFilter} />
        </Paper>
    );
};
