import {Typography, Divider, Chip} from '@mui/material';
import {calculateShiftDuration} from '@/entities/employee';
import type {Shift} from '@/entities/employee/types';

export const ShiftTooltip = ({shift}: {shift: Shift}) => {
    const plannedDuration = calculateShiftDuration(shift.plannedStart, shift.plannedEnd);
    let actualDuration = null;
    let status = 'По плану';

    if (shift.actualStart && shift.actualEnd) {
        actualDuration = calculateShiftDuration(shift.actualStart, shift.actualEnd);

        const plannedStart = new Date(shift.plannedStart);
        const actualStart = new Date(shift.actualStart);

        if (actualStart > plannedStart) {
            status = 'Опоздание';
        } else if (actualDuration < plannedDuration) {
            status = 'Ранний уход';
        }
    } else {
        const now = new Date();
        const plannedEnd = new Date(shift.plannedEnd);

        if (now > plannedEnd) {
            status = 'Прогул';
        }
    }

    return (
        <div>
            <Typography variant="subtitle1" gutterBottom>
                {shift.employee} • {shift.store}
            </Typography>
            <Divider sx={{my: 1}} />

            <Typography variant="body2">
                Должность: <strong>{shift.role}</strong>
            </Typography>

            <Typography variant="body2">
                План: {new Date(shift.plannedStart).toLocaleTimeString()} - {new Date(shift.plannedEnd).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2" mb={1}>
                Длительность: <strong>{plannedDuration.toFixed(1)} ч.</strong>
            </Typography>

            {shift.actualStart && shift.actualEnd ? (
                <>
                    <Typography variant="body2">
                        Факт: {new Date(shift.actualStart).toLocaleTimeString()} - {new Date(shift.actualEnd).toLocaleTimeString()}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        Длительность: <strong>{actualDuration?.toFixed(1)} ч.</strong>
                    </Typography>
                </>
            ) : status === 'Прогул' && (
                <Typography variant="body2" color="error" mb={1}>
                    Сотрудник отсутствовал на рабочем месте
                </Typography>
            )}

            <Chip
                label={status}
                size="small"
                color={
                    status === 'По плану' ? 'success' :
                        status === 'Опоздание' ? 'warning' :
                            status === 'Ранний уход' ? 'error' :
                                'error'
                }
            />
        </div>
    );
};
