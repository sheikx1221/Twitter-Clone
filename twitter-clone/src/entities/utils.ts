export type AppDate = {
    month: string;
    monthIndex: number;
    date: number;
    year: number;
}

export class ServerError {
    private message: string;
    private code: string;

    constructor(message: string, code: string) {
        this.message = message;
        this.code = code;
    }

    toString() {
        return this.message;
    }

    errorCode() {
        return this.code;
    }
}