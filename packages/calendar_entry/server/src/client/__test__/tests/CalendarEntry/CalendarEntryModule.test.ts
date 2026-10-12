import {testModuleDefinitions} from '@copor/core/client/__test__/testHelper/ModuleDefinitions.helper';
import {calendarEntryModule} from '@copor/calendar_entry/client/CalendarEntry/CalendarEntryModule';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

testModuleDefinitions(calendarEntryModule, CalendarEntryPermission);
