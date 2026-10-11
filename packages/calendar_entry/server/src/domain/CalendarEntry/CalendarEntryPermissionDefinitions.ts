import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';

export const calendarEntryPermissionDefinitions: PermissionDefinitionDTO[] = [
	{
		key: CalendarEntryPermission.canCreateCalendarEntry,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true,
		dependsOn: [CalendarEntryPermission.canGetCalendarEntryList]
	},
	{
		key: CalendarEntryPermission.canUpdateCalendarEntry,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true,
		dependsOn: [CalendarEntryPermission.canGetCalendarEntryList, CalendarEntryPermission.canGetCalendarEntry]
	},
	{
		key: CalendarEntryPermission.canDeleteCalendarEntry,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true,
		dependsOn: [CalendarEntryPermission.canGetCalendarEntryList, CalendarEntryPermission.canGetCalendarEntry]
	},
	{
		key: CalendarEntryPermission.canGetCalendarEntry,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true,
		dependsOn: [CalendarEntryPermission.canGetCalendarEntryList]
	},
	{
		key: CalendarEntryPermission.canGetCalendarEntryList,
		feature: CoreFeature.MY_ACCOUNT,
		requiresScope: true
	}
];
