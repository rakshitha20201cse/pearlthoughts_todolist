// src/components/DatePicker.js
import React, { useState, useEffect } from 'react';
import { addDays, addWeeks, addMonths, addYears, format } from 'date-fns';

function DatePicker({ onDateChange }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [recurrence, setRecurrence] = useState('daily');
    const [interval, setInterval] = useState(1);
    const [previewDates, setPreviewDates] = useState([]);

    useEffect(() => {
        if (startDate) {
            generatePreviewDates();
        }
    }, [startDate, endDate, recurrence, interval]);

    const generatePreviewDates = () => {
        const dates = [];
        let current = new Date(startDate);

        while (!endDate || current <= new Date(endDate)) {
            dates.push(current);
            if (recurrence === 'daily') {
                current = addDays(current, interval);
            } else if (recurrence === 'weekly') {
                current = addWeeks(current, interval);
            } else if (recurrence === 'monthly') {
                current = addMonths(current, interval);
            } else if (recurrence === 'yearly') {
                current = addYears(current, interval);
            }
        }

        setPreviewDates(dates.slice(0, 5)); // Limit preview to 5 dates
    };

    const handleStartDateChange = (e) => {
        const date = e.target.value;
        setStartDate(date);
        onDateChange({ startDate: date, endDate, recurrence, interval });
    };

    const handleEndDateChange = (e) => {
        const date = e.target.value;
        setEndDate(date);
        onDateChange({ startDate, endDate: date, recurrence, interval });
    };

    const handleRecurrenceChange = (e) => {
        const value = e.target.value;
        setRecurrence(value);
        onDateChange({ startDate, endDate, recurrence: value, interval });
    };

    const handleIntervalChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setInterval(value);
        onDateChange({ startDate, endDate, recurrence, interval: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto transition transform hover:scale-105 duration-300 ease-in-out">
            <label className="block mb-2 text-gray-700 font-semibold">Start Date</label>
            <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            />

            <label className="block mb-2 text-gray-700 font-semibold">End Date (optional)</label>
            <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            />

            <label className="block mb-2 text-gray-700 font-semibold">Recurrence</label>
            <select
                value={recurrence}
                onChange={handleRecurrenceChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>

            <label className="block mb-2 text-gray-700 font-semibold">Interval (every X {recurrence})</label>
            <input
                type="number"
                min="1"
                value={interval}
                onChange={handleIntervalChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary transition duration-150 ease-in-out"
            />

            <div className="mt-4">
                <h4 className="font-semibold mb-2">Preview Recurring Dates</h4>
                <ul className="list-disc pl-5 text-gray-700">
                    {previewDates.map((date, index) => (
                        <li key={index}>{format(date, 'yyyy-MM-dd')}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DatePicker;
