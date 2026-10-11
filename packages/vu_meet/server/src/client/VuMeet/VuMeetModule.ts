import path from 'path';
import {CoporModule} from '@copor/core/client/Core/Module/CoporModule';
import {vuMeetPermissionDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetPermissionDefinitions';
import {vuMeetFeatureDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetFeatureDefinitions';
import {VuMeetRouter} from '@copor/vu_meet/client/VuMeet/router/VuMeetRouter';
import {startCallRosterSweep} from '@copor/vu_meet/client/VuMeet/Core/CallRoster/CallRosterRegistry';
import {countVuMeetNotifications} from '@copor/vu_meet/client/VuMeet/Core/UnreadMessageCount/VuMeetNotificationCounters';
import {vuMeetPreferenceDefinitions} from '@copor/vu_meet/domain/VuMeet/VuMeetPreferenceDefinitions';
import {vuMeetMaxFileSizeMb} from '@copor/vu_meet/client/VuMeet/VuMeetConfig';

export const vuMeetModule: CoporModule = {
	name: 'vu_meet',
	localesFolder: path.join(__dirname, 'locales'),
	// The AI bot answers FAQs from AiContextItem's table (AiBot/CreateAiBotMessage).
	dependsOn: ['ai_context_item'],
	migrationsFolder: path.join(__dirname, 'migrations'),
	permissions: vuMeetPermissionDefinitions,
	features: vuMeetFeatureDefinitions,
	routes: [
		{path: '/vu-meet', router: VuMeetRouter}
	],
	onServerStart: startCallRosterSweep,
	notificationCounters: countVuMeetNotifications,
	preferences: vuMeetPreferenceDefinitions,
	clientConfig: (appContext) => ({maxFileSize: vuMeetMaxFileSizeMb(appContext)})
};
