import {coreModules} from '@copor/core/client/Core/Module/coreModules';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {newsModule} from '@copor/news/client/News/NewsModule';
import {toDoModule} from '@copor/todo/client/ToDo/ToDoModule';
import {vuMeetModule} from '@copor/vu_meet/client/VuMeet/VuMeetModule';
import {cloudModule} from '@copor/cloud/client/Cloud/CloudModule';
import {checklistModule} from '@copor/checklist/client/Checklist/ChecklistModule';
import {calendarEntryModule} from '@copor/calendar_entry/client/CalendarEntry/CalendarEntryModule';
import {aiContextItemModule} from '@copor/ai_context_item/client/AiContextItem/AiContextItemModule';
import {contactsModule} from '@copor/contacts/client/Contacts/ContactsModule';
import {helpModule} from '@copor/help/client/Help/HelpModule';

// The optional modules this app includes. Remove an entry to leave the
// feature out; core registers only what is listed here, after its own
// (ContentItem, Contract — see Core/Module/coreModules.ts).
export const enabledModules: CoporModule[] = [
	newsModule,
	toDoModule,
	vuMeetModule,
	cloudModule,
	checklistModule,
	calendarEntryModule,
	aiContextItemModule,
	contactsModule,
	helpModule
];

// What the app runs with: core's modules, then the app's optional ones.
export const allModules: CoporModule[] = [... coreModules, ... enabledModules];
