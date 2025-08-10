import {addDays, parseISO} from 'date-fns';
import type {ScheduleData, Shift, FilterOptions} from './types';

export function filterShifts(data: ScheduleData, options: FilterOptions): ScheduleData {
    const {startDate, endDate, maxDays} = options;

    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);

    const normalizedEnd = new Date(endDate);
    normalizedEnd.setHours(23, 59, 59, 999);

    const isInDateRange = (dateString: string) => {
        const date = new Date(dateString);
        return date >= normalizedStart && date <= normalizedEnd;
    };

    const filteredPlan = data.plan.filter(shift =>
        isInDateRange(shift.plannedStart) || isInDateRange(shift.plannedEnd)
    );

    const filteredFact = data.fact.filter(shift =>
        (shift.actualStart && isInDateRange(shift.actualStart)) ||
        (shift.actualEnd && isInDateRange(shift.actualEnd)) ||
        isInDateRange(shift.plannedStart) ||
        isInDateRange(shift.plannedEnd)
    );

    if (maxDays) {
        const maxEndDate = addDays(startDate, maxDays);

        return {
            plan: filteredPlan.filter(shift =>
                parseISO(shift.plannedStart) <= maxEndDate
            ),
            fact: filteredFact.filter(shift =>
                (shift.actualStart && parseISO(shift.actualStart) <= maxEndDate) ||
                parseISO(shift.plannedStart) <= maxEndDate
            )
        };
    }

    return {
        plan: filteredPlan,
        fact: filteredFact
    };
}

export function calculateShiftDuration(start: string, end: string): number {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
}

export function getShiftStatus(shift: Shift): string {
    const now = new Date();
    const plannedStart = new Date(shift.plannedStart);
    const plannedEnd = new Date(shift.plannedEnd);

    if (shift.actualStart && shift.actualEnd) {
        const actualDuration = calculateShiftDuration(shift.actualStart, shift.actualEnd);
        const plannedDuration = calculateShiftDuration(shift.plannedStart, shift.plannedEnd);
        const actualStart = new Date(shift.actualStart);

        if (actualStart > plannedStart) {
            return 'Опоздание';
        } else if (actualDuration < plannedDuration) {
            return 'Ранний уход';
        }
        return 'По плану';
    } else {
        if (now > plannedEnd) {
            return 'Прогул';
        } else if (now < plannedStart) {
            return 'Запланировано';
        } else {
            return 'В процессе';
        }
    }
}

export function groupShiftsByEmployee(data: ScheduleData): Record<string, Shift[]> {
    const grouped: Record<string, Shift[]> = {};

    const allShifts = [...data.plan, ...data.fact];

    allShifts.forEach(shift => {
        if (!grouped[shift.employee]) {
            grouped[shift.employee] = [];
        }

        const existingIndex = grouped[shift.employee].findIndex(s =>
            s.plannedStart === shift.plannedStart &&
            s.plannedEnd === shift.plannedEnd
        );

        if (existingIndex === -1) {
            grouped[shift.employee].push(shift);
        } else {
            const existing = grouped[shift.employee][existingIndex];
            if (shift.actualStart && shift.actualEnd) {
                existing.actualStart = shift.actualStart;
                existing.actualEnd = shift.actualEnd;
            }
        }
    });

    Object.keys(grouped).forEach(employee => {
        grouped[employee].sort((a, b) =>
            new Date(a.plannedStart).getTime() - new Date(b.plannedStart).getTime()
        );
    });

    return grouped;
}
