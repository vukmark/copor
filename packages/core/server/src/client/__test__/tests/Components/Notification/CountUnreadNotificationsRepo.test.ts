import {
	KyselyCountUnreadNotificationsInteractorRepo
} from '@copor/core/client/Components/Notification/CountUnreadNotifications/kysely/KyselyCountUnreadNotificationsInteractorRepo';

jest.mock('@copor/core/client/Core/Module/ModuleRegistry', () => ({
	getRegisteredModules: () => [
		{name: 'without_counters'},
		{name: 'chat', notificationCounters: jest.fn().mockResolvedValue({vuMeet: 3})},
		{name: 'other', notificationCounters: jest.fn().mockResolvedValue({other: 1})}
	]
}));

describe('KyselyCountUnreadNotificationsInteractorRepo', () => {
	it('merges every module\'s counters for the user', async () => {
		await expect(new KyselyCountUnreadNotificationsInteractorRepo().countUnread('user-1'))
			.resolves.toEqual({vuMeet: 3, other: 1});
	});
});
