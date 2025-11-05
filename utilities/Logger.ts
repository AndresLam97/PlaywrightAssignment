import { LogInfo } from '../constants/LogConstants';

export class Logger {

    private static formatLogMessage(logLevel: LogInfo, message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${logLevel}]: ${message}`;
    }

    public static info(message: string): void {
        console.log(this.formatLogMessage(LogInfo.INFO, message));
    }

    public static warn(message: string): void {
        console.log(this.formatLogMessage(LogInfo.WARN, message));
    }

    public static error(message: string): void {
        console.log(this.formatLogMessage(LogInfo.ERROR, message));
    }

    public static debug(message: string): void {
        if (process.env.DEBUG === 'true') {
            console.log(this.formatLogMessage(LogInfo.DEBUG, message));
        }
    }
}