export const addDays = (date: Date, days: number) => {
    date.setDate(date.getDate() + days);
    return date;
};

export const subtractDays = (date: Date, days: number) => {
    date.setDate(date.getDate() - days);
    return date;
};
