'use client';

import {useCallback, useMemo} from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    TimelineOppositeContent
} from '@mui/lab';
import {
    Typography,
    Paper,
    Tooltip,
    Avatar,
    useTheme,
    useMediaQuery,
    Chip
} from '@mui/material';
import {groupShiftsByEmployee, getShiftStatus} from '@/entities/employee';
import {ShiftTooltip} from './ShiftTooltip';
import styles from './styles.module.scss';
import type {ScheduleData} from '@/entities/employee/types';

export const ScheduleTimeline = ({data}: {data: ScheduleData}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const groupedShifts = useMemo(() => {
        return groupShiftsByEmployee(data);
    }, [data]);

    const sortedEmployees = useMemo(() => {
        return Object.entries(groupedShifts)
            .map(([employee, shifts]) => ({
                employee,
                shifts,
                firstShiftDate: new Date(shifts[0].plannedStart)
            }))
            .sort((a, b) => a.firstShiftDate.getTime() - b.firstShiftDate.getTime());
    }, [groupedShifts]);

    const formatDate = (isoString: string): string => {
        return new Date(isoString).toLocaleDateString([], {
            day: 'numeric',
            month: 'short'
        });
    };

    const formatTime = useCallback((isoString: string): string => {
        return new Date(isoString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }, []);

    // Для мобильных устройств - простой вертикальный список
    if (isMobile) {
        return (
            <div className={styles.mobileContainer}>
                {sortedEmployees.map(({employee, shifts}) => (
                    <Paper key={employee} elevation={1} className={styles.mobileCard}>
                        <div className={styles.mobileHeader}>
                            <Avatar className={styles.avatar}>{employee.charAt(0)}</Avatar>
                            <Typography variant="subtitle1" className={styles.employeeName}>
                                {employee}
                            </Typography>
                        </div>
                        <div className={styles.mobileShifts}>
                            {shifts.map((shift, index) => {
                                const status = getShiftStatus(shift);
                                const isAbsent = status === 'Прогул';

                                return (
                                    <Tooltip key={index} title={<ShiftTooltip shift={shift} />} placement="top">
                                        <div className={styles.mobileShift}>
                                            <div className={styles.dateContainer}>
                                                <div className={styles.dateBadge}>
                                                    {formatDate(shift.plannedStart)}
                                                </div>
                                                {isAbsent && (
                                                    <Chip
                                                        label="Прогул"
                                                        size="small"
                                                        color="error"
                                                        className={styles.absentBadge}
                                                    />
                                                )}
                                            </div>
                                            <div className={styles.mobileShiftInfo}>
                                                <div className={styles.plannedShift}>
                                                    {formatTime(shift.plannedStart)} - {formatTime(shift.plannedEnd)}
                                                </div>
                                                {shift.actualStart && shift.actualEnd && (
                                                    <div className={styles.actualShift}>
                                                        Факт: {formatTime(shift.actualStart)} - {formatTime(shift.actualEnd)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Tooltip>
                                );
                            })}
                        </div>
                    </Paper>
                ))}
            </div>
        );
    }

    // Для десктопов - используем Timeline
    return (
        <div className={styles.timelineContainer}>
            <Timeline position="alternate">
                {sortedEmployees.map(({employee, shifts}) => (
                    <TimelineItem key={employee}>
                        <TimelineOppositeContent color="text.secondary" className={styles.timelineDate}>
                            {formatDate(shifts[0].plannedStart)}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <Avatar>{employee.charAt(0)}</Avatar>
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={styles.employeeCard}>
                                <Typography variant="h6" className={styles.employeeName}>
                                    {employee}
                                </Typography>
                                <div className={styles.shiftsContainer}>
                                    {shifts.map((shift, index) => {
                                        const status = getShiftStatus(shift);
                                        const isAbsent = status === 'Прогул';

                                        return (
                                            <Tooltip
                                                key={index}
                                                title={<ShiftTooltip shift={shift} />}
                                                placement="top"
                                            >
                                                <div className={styles.shiftBlock}>
                                                    <div className={styles.dateContainer}>
                                                        <div className={styles.dateBadge}>
                                                            {formatDate(shift.plannedStart)}
                                                        </div>
                                                        {isAbsent && (
                                                            <Chip
                                                                label="Прогул"
                                                                size="small"
                                                                color="error"
                                                                className={styles.absentBadge}
                                                            />
                                                        )}
                                                    </div>
                                                    <div className={styles.shiftInfo}>
                                                        <div className={styles.plannedShift}>
                                                            {formatTime(shift.plannedStart)} - {formatTime(shift.plannedEnd)}
                                                        </div>
                                                        {shift.actualStart && shift.actualEnd && (
                                                            <div className={styles.actualShift}>
                                                                Факт: {formatTime(shift.actualStart)} - {formatTime(shift.actualEnd)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        );
                                    })}
                                </div>
                            </Paper>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};
