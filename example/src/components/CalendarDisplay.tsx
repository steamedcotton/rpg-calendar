import React, { FunctionComponent } from 'react';
import { RPGCalendarMonthDisplay } from '../../../src/lib/types';
import { Week } from './Week';

interface CalendarDisplayProps {
  currentMonth: RPGCalendarMonthDisplay;
  onPrev: () => void;
  onNext: () => void;
}

export const CalendarDisplay: FunctionComponent<CalendarDisplayProps> = ({ currentMonth, onPrev, onNext }) => {
  if (currentMonth) {
    const { weeks, weekdays, year, monthOfYear } = currentMonth;

    return (
      <div className="calendar-display">
        <div className="calendar-top">
          <div>
            <button onClick={onPrev}>&lt; Previous</button>
          </div>
          <div className="calendar-info">
            <h2>{currentMonth.name}</h2>
            <h3>
              {currentMonth.year} - {currentMonth.yearName}
            </h3>
          </div>
          <div>
            <button onClick={onNext}>Next &gt;</button>
          </div>
        </div>
        <div className="weeks">
          {weeks.map((week, i) => (
            <Week key={`week-${i}-${monthOfYear}-${year}`} week={week} weekdays={weekdays} />
          ))}
        </div>
      </div>
    );
  }

  return <div />;
};
