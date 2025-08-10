export type ApiResponse<T> = {
    data: T;
    error?: string;
    status: 'success' | 'error';
};

export type OptionType = {
    value: string;
    label: string;
    disabled?: boolean;
};

export type DateRange = {
    start: Date;
    end: Date;
};

export type FilterParams = {
    dateRange: DateRange;
    stores?: string[];
    roles?: string[];
    employees?: string[];
};
