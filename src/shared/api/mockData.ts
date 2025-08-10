import {ScheduleData} from '@/entities/employee/types';

export async function getScheduleData(): Promise<ScheduleData> {
    return {
        plan: [
            {
                employee: "Иванов Иван",
                store: "Центральный",
                role: "Кассир",
                plannedStart: "2025-08-07T09:00:00",
                plannedEnd: "2025-08-07T17:00:00"
            },
            {
                employee: "Петрова Анна",
                store: "Северный",
                role: "Администратор",
                plannedStart: "2025-08-12T10:00:00",
                plannedEnd: "2025-08-12T19:00:00"
            },
            {
                employee: "Петрова Анна",
                store: "Северный",
                role: "Администратор",
                plannedStart: "2025-08-13T10:00:00",
                plannedEnd: "2025-08-13T19:00:00"
            },
            {
                employee: "Козлов Дмитрий",
                store: "Западный",
                role: "Охранник",
                plannedStart: "2025-08-09T08:00:00",
                plannedEnd: "2025-08-09T20:00:00"
            }
        ],
        fact: [
            {
                employee: "Иванов Иван",
                store: "Центральный",
                role: "Кассир",
                plannedStart: "2025-08-07T09:00:00",
                plannedEnd: "2025-08-07T17:00:00",
                actualStart: "2025-08-07T09:15:00",
                actualEnd: "2025-08-07T16:45:00"
            },
        ]
    };
}