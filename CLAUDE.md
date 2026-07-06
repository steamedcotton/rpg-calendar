# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm test` — run the Jest suite (config in `jest.config.js`, tests colocated as `*.test.ts` under `src/`).
- `npx jest src/lib/leapYear.test.ts` — run a single test file. Add `-t "name"` to filter by test name.
- `npm run build` — parallel dual build: CommonJS (`build/main` via `tsconfig.json`) and ES modules (`build/module` via `tsconfig.module.json`). Both are published; `package.json` `main`/`module`/`typings` point at them.
- `npm run fix` — Prettier + ESLint autofix over `src/**/*.ts` (also `fix:example` for the demo app).
- Example app: `cd example && npm run dev` (Vite + React demo consuming the library).

## Architecture

This is a **low-level, configuration-driven** library for fantasy calendars. There is no built-in "current date" — callers own state and query the library for derived information about arbitrary dates.

### Core flow

`RPGCalendar` (`src/RPGCalendar.ts`) is the single public class. Its constructor takes a `RPGCalendarConfig` and uses **builder functions** from `src/lib/` to close over the config once, producing specialized helpers (`isLeapYear`, `getDaysInYear`, `getDaysInMonth`, `getExtraDay`, `getNext/PrevMonthYear`, etc.). Each `src/lib/<name>.ts` exports a `<name>Builder` that returns the closed-over function — this is the pattern to follow when adding calendar behavior. Do not read `this.config` at query time in hot paths; wire a builder in the constructor instead.

Public query methods on `RPGCalendar`:
- `epochToDate(epoch)` / `dateStringToRPGDate(str)` / `createDate(y, m, d, ...)` — three ways to construct a fully-populated `RPGCalendarDate`.
- `getDisplayMonth({ year, month })` — returns a `RPGCalendarMonthDisplay` optimized for rendering: `weeks: RPGCalendarDate[][]` (padded leading empty cells when `monthStartOnWeekStart` is false) plus `extraDays: RPGCalendarDate[]` for intercalary days surfaced separately.
- `getDaySpanFromDate(date)` — start/end `RPGCalendarDate`s covering a whole day, driven by `hoursInDay`/`minutesInHour`/`secondsInMinutes` in the config.

### The epoch model

An **epochDay** is an integer count of days from year `0` (or `1`, depending on `hasYear0`). A **complex epoch string** is `"<epochDay>-hh:mm:ss"`. `epochToDate` walks years then months subtracting days — this is O(years); avoid calling it in tight inner loops for very distant dates.

### Intercalary ("extra") days

`RPGCalendarMonth.extraDays` (config-level `RPGCalendarExtraDay[]`) declares intercalary days appended to a month (e.g. Harptos's Midwinter, Shieldmeet, or Gregorian Feb 29). Some carry `onlyInLeapYear: true`. `getDisplayMonth` deliberately **separates** these from `weeks` — they don't belong to any weekday cell. `getDaysInMonth` includes them in totals when they apply, so `createDate(year, month, daysInMonth + N)` works and `getExtraDay` will resolve them. This split is intentional: don't fold `extraDays` back into `weeks`.

### Leap-year handling

Two mechanisms, checked in this order by `isLeapYearBuilder`:
1. `config.isLeapYear(year, hasYear0)` override (used by Gregorian since its rule can't be expressed as one interval).
2. `config.leapYearInterval` — simple `year % interval === 0`.

`hasYear0: false` calendars throw on `year === 0`. Harptos treats year 0 as a leap year for symmetry with negative years; Gregorian does not use year 0.

### Built-in calendars

`src/calendars/` exports two presets via `calendars`:
- `calendars.harptos.extraDays` / `.extraMonths` / `.standard` (`.standard === .extraDays`) — Forgotten Realms.
- `calendars.gregorian` — real-world Gregorian, uses `isLeapYear` override.

Each calendar is a folder of small modules (`weekdays.ts`, `months.ts`, `seasons.ts`, `time.ts`, plus a top-level config object). Adding a new calendar means creating a similar folder and exporting it from `src/calendars/index.ts`.

## Conventions

- **Public API surface is `src/index.ts` only.** Anything not re-exported there is internal — consumers should not depend on `lib/*` paths.
- Builder pattern (see above) — new calendar-derived helpers should follow it rather than being methods that re-read `this.config` each call.
- Tests are colocated (`foo.ts` + `foo.test.ts`) under `src/`. Integration-style tests for whole calendars live at `src/calendars/<name>/<name>.test.ts`.
- The `example/` app is a self-contained Vite + React + Zustand demo with its own `package.json` and `node_modules`; it is not part of the library build.
