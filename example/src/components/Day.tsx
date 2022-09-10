import React, { FunctionComponent } from 'react';
import { RPGCalendarDate } from '../../../src/lib/types';

interface DayProps {
  day: RPGCalendarDate;
}

export const Day: FunctionComponent<DayProps> = ({ day }) => {
  return (
    <div className="day">
      <div className="day-number">{String(day.dayOfMonth).padStart(2, '0')}</div>
      {day?.extraDay && <div className="day-name">{day?.extraDay.name}</div>}
    </div>
  );
};
