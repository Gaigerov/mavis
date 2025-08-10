'use client';

import {useState} from 'react';
import {ScheduleFilter} from '@/features/schedule-filter';
import {ScheduleView} from '@/features/schedule-view';
import {ScheduleData} from '@/entities/employee';
import {Box, Typography} from '@mui/material';
import styles from './styles.module.scss';

export const Schedule = ({data}: {data: ScheduleData}) => {
    const [filteredData, setFilteredData] = useState<ScheduleData>(data);

    return (
        <Box className={styles.schedule}>
            <Typography variant="h4" component="h1" gutterBottom>
                График работы сотрудников
            </Typography>

            <ScheduleFilter data={data} onFilter={setFilteredData} />
            <ScheduleView data={filteredData} />
        </Box>
    );
};