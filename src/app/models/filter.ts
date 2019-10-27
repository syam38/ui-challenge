export interface IFilter {
    customerId: string;
    dateRange: IDateRange;
}

export interface IDateRange {
    begin: Date;
    end: Date;
}