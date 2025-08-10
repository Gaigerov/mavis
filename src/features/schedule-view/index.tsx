'use client';

import {ScheduleTimeline} from './components/ScheduleTimeline';
import {ScheduleData} from '@/entities/employee';
import {Paper} from '@mui/material';
import styles from './styles.module.scss';

export const ScheduleView = ({data}: {data: ScheduleData}) => {
    return (
        <Paper elevation={0} className={styles.scheduleView}>
            <ScheduleTimeline data={data} />
        </Paper>
    );
};