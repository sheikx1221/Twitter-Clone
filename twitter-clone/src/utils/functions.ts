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

export function getTimePassed(input: string): string {
    const date = new Date(input);
    const now = new Date();
    const secondsElapsed = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsElapsed < 60) {
        return `${secondsElapsed} second${secondsElapsed !== 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 3600) {
        const minutes = Math.floor(secondsElapsed / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 86400) {
        const hours = Math.floor(secondsElapsed / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 604800) {
        const days = Math.floor(secondsElapsed / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 2592000) {
        const weeks = Math.floor(secondsElapsed / 604800);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (secondsElapsed < 31536000) {
        const months = Math.floor(secondsElapsed / 2592000);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(secondsElapsed / 31536000);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
}
