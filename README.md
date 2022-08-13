# RPG Calendar

**THIS IS CURRENTLY A WORK IN PROGRESS**

I will remove this message, when this library is ready for "prime-time"

## Usage

```typescript
import { Calendar, calendars } from 'rpg-calendar';

// Create a new Calendar using the Harptos Extra Days configuration.  This will add the "special" days as extra days
// at the end of each month.  If you want the days to be separate months, then you can use
// calendars.harptos.extraMonths.
const cal = new Calendar(calendars.harptos.extraDays);

// Use the calandar to parse an epoch
console.log(cal.epochToDate('500-11:57:30'));
```

## Build in Calendars

# Harptos

It was a little difficult to find a source of truth of details around the calendar of Harptos.  As best as I can tell, these assumptions are true (and they are what I used to implement the configurations in `calendars.harptos`):

* There is a year 0.  There are several references ([like this one](https://www.sageadvice.eu/forgotten-realms-is-there-a-year-0-dr-or-is-1-dr-immediately-followed-by-1-dr-if-there-is-a-year-0-what-happens-in-it/)) to Year 0 - "The Year of the Rising Flame".
* Year 0 was a leap year.  I didn't find anything about this other than "every 4 years" and this makes it a little more consistent for the negative years (e.g. years -4, 0, 4 are all leap years).

## References

I used the following for references and inspiration:

- [Forgotten Realms Calendar Tool](https://thesilverdaggers.com/wp-content/uploads/fc/#)
- [D&D Forgotten Realms Calendar](http://dnd.steinhour.net/Forgotten_Realms_campaign/Forgotten_Realms/DnD_FR_calendar.html#The%20Roll%20of%20Years)
- [World Anvil - Calendar of Harptos](https://www.worldanvil.com/w/forgotten-realms-28d26d5th29-lethann/a/calendar-of-harptos-article)
- [City of Splendors. Dungeon of Madness. : Time in the Forgotten Realms](https://cityofsplendorsdungeonofmadness.obsidianportal.com/wikis/time-in-the-forgotten-realms)
