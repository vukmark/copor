import {ModulePreferenceDefinitionDTO} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceDefinitionDTO';

export enum VuMeetPreference {
	// Off: no push for new chat messages. Incoming calls still ring.
	messagePushNotifications = 'vu_meet.messagePushNotifications'
}

export const vuMeetPreferenceDefinitions: ModulePreferenceDefinitionDTO[] = [
	{key: VuMeetPreference.messagePushNotifications, default: true}
];
