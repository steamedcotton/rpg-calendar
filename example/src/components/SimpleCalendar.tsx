import React, { FunctionComponent, useState, useEffect } from 'react';
import { Calendar, calendars } from '../../../src';
import { RPGCalendarMonthDisplay, RPGCalendarMonthQuery } from '../../../src/lib/types';
import { CalendarDisplay } from './CalendarDisplay';
import './SimpleCalendar.css';

const h = new Calendar(calendars.harptos.extraDays);

export const SimpleCalendar: FunctionComponent = () => {
  const [monthQuery, setMonthQuery] = useState<RPGCalendarMonthQuery>({ year: 1, month: 1 });
  const [currentMonth, setCurrentMonth] = useState<RPGCalendarMonthDisplay>();

  useEffect(() => {
    setCurrentMonth(h.getDisplayMonth(monthQuery));
  }, [monthQuery]);

  if (currentMonth) {
    return (
      <div className="simple-calendar">
        <CalendarDisplay
          currentMonth={currentMonth}
          onPrev={() => setMonthQuery(currentMonth?.prevMonthQuery)}
          onNext={() => setMonthQuery(currentMonth?.nextMonthQuery)}
        />
      </div>
    );
  }

  return null;
};
