import React, { FunctionComponent } from 'react';
import { RPGCalendarDate, RPGCalendarWeekday } from '../../../src/lib/types';
import { Day } from './Day';

interface WeekProps {
  week: RPGCalendarDate[];
  weekdays: RPGCalendarWeekday[];
}

export const Week: FunctionComponent<WeekProps> = ({ week = [], weekdays = [] }) => {
  let emptyDays = weekdays.length;

  return (
    <div className="week">
      {week.map((day) => {
        emptyDays--;
        return <Day key={`week-${day.dayOfMonth}-${day.year}`} day={day} />;
      })}
      {[...Array(emptyDays)].map((_, i) => (
        <div className="empty-day" key={`empty-${i}`} />
      ))}
    </div>
  );
};
