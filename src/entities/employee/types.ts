export interface Shift {
    employee: string;       // ФИО сотрудника
    store: string;          // Название магазина
    role: string;           // Должность
    plannedStart: string;   // Плановое время начала
    plannedEnd: string;     // Плановое время окончания
    actualStart?: string;   // Фактическое время начала
    actualEnd?: string;     // Фактическое время окончания
}

export interface ScheduleData {
    plan: Shift[];
    fact: Shift[];
}

export interface FilterOptions {
    startDate: Date;
    endDate: Date;
    maxDays?: number;
}
