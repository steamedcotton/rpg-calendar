import create from 'zustand';
import { RPGCalendarMonthDisplay, RPGCalendarMonthQuery, RPGCalendarMonth } from '../../../src/lib/types';
import { RPGCalendar, calendars } from '../../../src';

const initialMonthQuery: RPGCalendarMonthQuery = {
  month: 1,
  year: 1
};

interface CalendarStore {
  month: RPGCalendarMonthDisplay;
  months: RPGCalendarMonth[];
  setMonthYear: (monthQuery: RPGCalendarMonthQuery) => void;
  nextMonth: () => void;
  prevMonth: () => void;
  nextYear: () => void;
  prevYear: () => void;
}

const h = new RPGCalendar(calendars.harptos.extraDays);
const months = h.getMonths();

export const useStore = create<CalendarStore>((set) => ({
  month: h.getDisplayMonth(initialMonthQuery),
  months: months,
  setMonthYear: (monthQuery) => set(() => ({ month: h.getDisplayMonth(monthQuery) })),
  prevMonth: () => set((state) => ({ month: h.getDisplayMonth(state.month.prevMonthQuery) })),
  nextMonth: () => set((state) => ({ month: h.getDisplayMonth(state.month.nextMonthQuery) })),
  nextYear: () => set((state) => ({ month: h.getDisplayMonth(state.month.nextYearQuery) })),
  prevYear: () => set((state) => ({ month: h.getDisplayMonth(state.month.prevYearQuery) }))
}));
