import {PermissionDefinitionDTO} from '@copor/core/domain/Core/Permission/PermissionDefinitionDTO';
import {FeatureDefinitionDTO} from '@copor/core/domain/FeatureList/FeatureDefinitionDTO';
import {registerFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {getAllPermissionTypes, registerPermissionDefinitions} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {corePermissionDefinitions} from '@copor/core/domain/Core/Permission/CorePermissionDefinitions';
import {coreFeatureDefinitions} from '@copor/core/domain/FeatureList/CoreFeatureDefinitions';
import {VuMeetPermission} from '@copor/vu_meet/domain/VuMeet/VuMeetPermission';
import {vuMeetPermissionDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetPermissionDefinitions';
import {vuMeetFeatureDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetFeatureDefinitions';
import {ToDoPermission} from '@copor/todo/domain/ToDo/ToDoPermission';
import {toDoPermissionDefinitions} from '@copor/todo/domain/ToDo/ToDoPermissionDefinitions';
import {toDoFeatureDefinitions} from '@copor/todo/domain/ToDo/ToDoFeatureDefinitions';
import {CloudPermission} from '@copor/cloud/domain/Cloud/CloudPermission';
import {cloudPermissionDefinitions} from '@copor/cloud/domain/Cloud/CloudPermissionDefinitions';
import {cloudFeatureDefinitions} from '@copor/cloud/domain/Cloud/CloudFeatureDefinitions';
import {ChecklistPermission} from '@copor/checklist/domain/Checklist/ChecklistPermission';
import {checklistPermissionDefinitions} from '@copor/checklist/domain/Checklist/ChecklistPermissionDefinitions';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';
import {contractPermissionDefinitions} from '@copor/core/domain/Contract/ContractPermissionDefinitions';
import {contractFeatureDefinitions} from '@copor/core/domain/Contract/ContractFeatureDefinitions';
import {NewsPermission} from '@copor/news/domain/News/NewsPermission';
import {newsPermissionDefinitions} from '@copor/news/domain/News/NewsPermissionDefinitions';
import {newsFeatureDefinitions} from '@copor/news/domain/News/NewsFeatureDefinitions';
import {ContentItemPermission} from '@copor/core/domain/ContentItem/ContentItemPermission';
import {contentItemPermissionDefinitions} from '@copor/core/domain/ContentItem/ContentItemPermissionDefinitions';
import {contentItemFeatureDefinitions} from '@copor/core/domain/ContentItem/ContentItemFeatureDefinitions';
import {AiContextItemPermission} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermission';
import {aiContextItemPermissionDefinitions} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemPermissionDefinitions';
import {aiContextItemFeatureDefinitions} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeatureDefinitions';
import {CalendarEntryPermission} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermission';
import {calendarEntryPermissionDefinitions} from '@copor/calendar_entry/domain/CalendarEntry/CalendarEntryPermissionDefinitions';
import {ContactsPermission} from '@copor/contacts/domain/Contacts/ContactsPermission';
import {contactsPermissionDefinitions} from '@copor/contacts/domain/Contacts/ContactsPermissionDefinitions';
import {contactsFeatureDefinitions} from '@copor/contacts/domain/Contacts/ContactsFeatureDefinitions';
import {HelpPermission} from '@copor/help/domain/Help/HelpPermission';
import {helpPermissionDefinitions} from '@copor/help/domain/Help/HelpPermissionDefinitions';
import {helpFeatureDefinitions} from '@copor/help/domain/Help/HelpFeatureDefinitions';
import {vuMeetPreferenceDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetPreferenceDefinitions';
import {cloudPreferenceDefinitions} from '@copor/cloud/domain/Cloud/CloudPreferenceDefinitions';
import {
	findModulePreferenceDefinition,
	registerModulePreferences
} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';
import {ModulePreferenceDefinitionDTO} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceDefinitionDTO';

import {CoreFeature} from '@copor/core/domain/FeatureList/enum/CoreFeature';
import {VuMeetFeature} from '@copor/vu_meet/domain/VuMeet/VuMeetFeature';
import {ToDoFeature} from '@copor/todo/domain/ToDo/ToDoFeature';
import {CloudFeature} from '@copor/cloud/domain/Cloud/CloudFeature';
import {ContractFeature} from '@copor/core/domain/Contract/ContractFeature';
import {NewsFeature} from '@copor/news/domain/News/NewsFeature';
import {ContentItemFeature} from '@copor/core/domain/ContentItem/ContentItemFeature';
import {AiContextItemFeature} from '@copor/ai_context_item/domain/AiContextItem/AiContextItemFeature';
import {ContactsFeature} from '@copor/contacts/domain/Contacts/ContactsFeature';
import {HelpFeature} from '@copor/help/domain/Help/HelpFeature';

interface ModuleDefinitionSet {
	moduleName: string;
	permissions: Record<string, string>;
	definitions: PermissionDefinitionDTO[];
	features: FeatureDefinitionDTO[];
	featureKeys: Record<string, string>;
}

// Every permission and feature set domain knows about. In the running app only the
// modules in client/src/modules.ts are registered; tests register all of them.
export const allModuleSets: ModuleDefinitionSet[] = [
	{moduleName: 'core', permissions: CorePermission, definitions: corePermissionDefinitions, features: coreFeatureDefinitions, featureKeys: CoreFeature},
	{moduleName: 'vu_meet', permissions: VuMeetPermission, definitions: vuMeetPermissionDefinitions, features: vuMeetFeatureDefinitions, featureKeys: VuMeetFeature},
	{moduleName: 'todo', permissions: ToDoPermission, definitions: toDoPermissionDefinitions, features: toDoFeatureDefinitions, featureKeys: ToDoFeature},
	{moduleName: 'cloud', permissions: CloudPermission, definitions: cloudPermissionDefinitions, features: cloudFeatureDefinitions, featureKeys: CloudFeature},
	{moduleName: 'checklist', permissions: ChecklistPermission, definitions: checklistPermissionDefinitions, features: [], featureKeys: {}},
	{moduleName: 'contract', permissions: ContractPermission, definitions: contractPermissionDefinitions, features: contractFeatureDefinitions, featureKeys: ContractFeature},
	{moduleName: 'news', permissions: NewsPermission, definitions: newsPermissionDefinitions, features: newsFeatureDefinitions, featureKeys: NewsFeature},
	{moduleName: 'content_item', permissions: ContentItemPermission, definitions: contentItemPermissionDefinitions, features: contentItemFeatureDefinitions, featureKeys: ContentItemFeature},
	{moduleName: 'ai_context_item', permissions: AiContextItemPermission, definitions: aiContextItemPermissionDefinitions, features: aiContextItemFeatureDefinitions, featureKeys: AiContextItemFeature},
	{moduleName: 'calendar_entry', permissions: CalendarEntryPermission, definitions: calendarEntryPermissionDefinitions, features: [], featureKeys: {}},
	{moduleName: 'contacts', permissions: ContactsPermission, definitions: contactsPermissionDefinitions, features: contactsFeatureDefinitions, featureKeys: ContactsFeature},
	{moduleName: 'help', permissions: HelpPermission, definitions: helpPermissionDefinitions, features: helpFeatureDefinitions, featureKeys: HelpFeature}
];

export function registerAllModuleDefinitions(): void {
	const registered = new Set(getAllPermissionTypes());

	for (const set of allModuleSets) {
		if (set.moduleName !== 'core' && !set.definitions.some((definition) => registered.has(definition.key))) {
			registerPermissionDefinitions(set.moduleName, set.definitions);
			registerFeatureDefinitions(set.moduleName, set.features);
		}
	}

	const preferenceSets: [string, ModulePreferenceDefinitionDTO[]][] = [
		['vu_meet', vuMeetPreferenceDefinitions],
		['cloud', cloudPreferenceDefinitions]
	];

	for (const [moduleName, definitions] of preferenceSets) {
		if (!findModulePreferenceDefinition(definitions[0].key))
			registerModulePreferences(moduleName, definitions);
	}
}
