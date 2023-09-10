import { AppDate } from '../entities/utils';
import './date.scss';
import { useState, useMemo } from 'react';

const MONTHS: string[] = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

interface Props {
    date?: AppDate;
    setDateString: (date: AppDate) => void;
}
export function AppDateInput(props: Props) {
    console.log(props.date);
    const [month, setMonth] = useState<number | undefined>(props.date?.monthIndex);
    const [date, setDate] = useState<number | undefined>(props.date?.date);
    const [year, setYear] = useState<number | undefined>(props.date?.year);

    const { days, months, years } = useMemo(() => {
        console.log({ date, month, year });
        const days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
        
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const years: number[] = Array.from({ length: currentYear + 1 - 1903 }, (_, i) => 1903 + i);
        const leapYears = (years: number[]) => years.filter((year) => year % 4 === 0);

        let updatedDays = days;
        let updatedMonths: any = MONTHS;
        let updatedYears = years;
        
        // year || 2024 is used to select leap year if year is not give to get 29 days for Feb always
        const daysInMonth = new Date(year || 2024, month ? month + 1: currentMonth, 0).getDate();
        if (daysInMonth === 30) {
            updatedDays = days.slice(0, 30);
        } else if (daysInMonth === 29) {
            updatedDays = days.slice(0, 29);
            updatedYears = leapYears(updatedYears);
        } else if (daysInMonth === 28) {
            updatedDays = days.slice(0, 28);
        } else if (date === 31) {
            const monthsWith31Days = [0, 2, 4, 6, 7, 9, 11]; // Months with 31 days
            updatedDays = days.slice(0, 31);
            updatedMonths = monthsWith31Days.map((index) => ({ index, month: MONTHS[index]}));
        }

        if (date && month && year) {
            props.setDateString({ date: date, month: MONTHS[month], monthIndex: month, year: year });
        }

        return { days: updatedDays, months: updatedMonths, years: updatedYears.reverse() };
    }, [date, month, year]);

    return (
        <div className="d-flex row w-100">
            <div className="px-0 pe-2" style={{ flex: 0.5 }}>
                <div className="form-floating mb-3">
                    <select
                        value={month}
                        onChange={(e) => {
                            setMonth(Number(e.target.value));
                        }}
                        className="form-select" id="floatingSelect" aria-label="Month"
                    >
                        <option value={-1}></option>
                        {months.map((month: string | { index: number, month: string }, index: number) => (
                            <>
                                {typeof month === "string" ? (
                                    <option key={index} value={index}>{month}</option>
                                ) : (
                                    <option key={month.index} value={month.index}>{month.month}</option>
                                )}
                            </>
                        ))}
                    </select>
                    <label>Month</label>
                </div>
            </div>

            <div className="px-0 pe-2" style={{ flex: 0.25 }}>
                <div className="form-floating mb-3">
                    <select
                        value={date}
                        onChange={(e) => setDate(Number(e.target.value))}
                        className="form-select" id="floatingDate" aria-label="Select Date"
                    >
                        <option value={-1}></option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                    <label>Day</label>
                </div>
            </div>

            <div className="px-0 pe-2" style={{ flex: 0.25 }}>
                <div className="form-floating mb-3">
                    <select
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="form-select" id="floatingYear" aria-label="Select Year"
                    >
                        <option value={-1}></option>
                        {years.map((year) => (
                            // Hide non-leap years if Feb 29 is selected
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                    <label>Year</label>
                </div>
            </div>
        </div>
    );
}
