import React, { FunctionComponent, useEffect, useState } from 'react';
import { Week } from './Week';
import { MonthTypes } from '../../../src/lib/monthTypes';
import { useStore } from '../stores/CalendarStore';

import './CalendarDisplay.css';

export const CalendarDisplay: FunctionComponent = () => {
  const month = useStore((state) => state.month);
  const months = useStore((state) => state.months);
  const nextMonth = useStore((state) => state.nextMonth);
  const prevMonth = useStore((state) => state.prevMonth);
  const setMonthYear = useStore((state) => state.setMonthYear);
  const prevYear = useStore((state) => state.prevYear);
  const nextYear = useStore((state) => state.nextYear);
  const { weeks, weekdays, year, monthOfYear } = month;

  const [yearInput, setYearInput] = useState<string>('1');

  useEffect(() => {
    if (yearInput && !isNaN(parseInt(yearInput))) {
      setMonthYear({ month: monthOfYear, year: parseInt(yearInput) });
    }
  }, [yearInput]);

  useEffect(() => {
    setYearInput(year.toString());
  }, [year]);

  return (
    <div className="simple-calendar">
      <div className="calendar-display">
        <div className="calendar-top">
          <div className="nav-buttons">
            <button onClick={prevMonth}>&lt; Previous Month</button>
            <button onClick={prevYear}>&lt; Previous Year</button>
          </div>
          <div className="calendar-info">
            <h2>
              <span className="month-year-spacing">Month</span>
              <select
                value={month.monthOfYear}
                className="month-input"
                onChange={(e) => {
                  setMonthYear({ year, month: parseInt(e.target.value) });
                }}
              >
                {months.map(({ name, type, monthInYear }) => (
                  <option key={`month-option-${monthInYear}`} value={monthInYear}>
                    [{monthInYear}] {name}
                    {type === MonthTypes.INTER_CAL && '*'}
                  </option>
                ))}
              </select>
              <span className="month-year-spacing">Year</span>
              <input
                className="year-input"
                value={yearInput}
                onChange={(e) => {
                  setYearInput(e.target.value);
                }}
              />
            </h2>
            <h3>{month.yearName}</h3>
          </div>
          <div className="nav-buttons">
            <button onClick={nextMonth}>Next Month &gt;</button>
            <button onClick={nextYear}>Next Year &gt;</button>
          </div>
        </div>
        <div className="weeks">
          {weeks.map((week, i) => (
            <Week key={`week-${i}-${monthOfYear}-${year}`} week={week} weekdays={weekdays} />
          ))}
        </div>
      </div>
    </div>
  );
};
