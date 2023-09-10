type DebouncedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => void;

export function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
): DebouncedFunction<F> {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return function (...args: Parameters<F>) {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    };
}

export function timeAgo(input: string) {
    const date = new Date(input);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges: any = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key as any);
        }
    }
}