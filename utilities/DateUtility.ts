export class DateUtility {
    private static validateDay(day: number, month: number, year: number): void {
        const date = new Date(year, month, 0).getDate();
        if (day < 1 || day > date) {
            throw new Error("Invalid day for the month!!!");
        }
    }

    private static validateMonth(month: number): void {
        if (month < 1 || month > 12) {
            throw new Error("Invalid month!!!");
        }
    }

    private static validateYear(year: number): void {
        if (year < 1) {
            throw new Error("Invalid year!!!");
        }
    }

    public static validateDate(day: number, month: number, year: number) {
        try {
            this.validateDay(day, month, year);
            this.validateMonth(month);
            this.validateYear(year);
        } catch (error) {
            throw error;
        }
    }
}