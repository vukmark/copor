import {MainRouter} from '@copor/core/client/Core/MainRouter';
import {IRoute, testRouter} from '@copor/core/client/__test__/testHelper/Router.helper';

describe('test MainRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/login',
			method: 'nextRouter'
		},
		{
			path: '/locale/:ns',
			method: 'get'
		},
		{
			path: '/logo',
			method: 'get'
		},
		{
			path: '/assets/*',
			method: 'get'
		},
		{
			path: '/avatar/initials/:name',
			method: 'get'
		},
		{
			path: '/country',
			method: 'nextRouter'
		},
		{
			path: '/state',
			method: 'nextRouter'
		},
		{
			path: '/todo',
			method: 'nextRouter'
		},
		{
			path: '/user/account-information',
			method: 'nextRouter'
		},
		{
			path: '/user',
			method: 'nextRouter'
		},
		{
			path: '/deletion-requests',
			method: 'nextRouter'
		},
		{
			path: '/language',
			method: 'nextRouter'
		},
		{
			path: '/native-language',
			method: 'nextRouter'
		},
		{
			path: '/region',
			method: 'nextRouter'
		},
		{
			path: '/tag',
			method: 'nextRouter'
		},
		{
			path: '/notification-token',
			method: 'nextRouter'
		},
		{
			path: '/notification',
			method: 'nextRouter'
		},
		{
			path: '/user-preferences',
			method: 'nextRouter'
		},
		{
			path: '/vu-meet',
			method: 'nextRouter'
		},
		{
			path: '/role',
			method: 'nextRouter'
		},
		{
			path: '/documents',
			method: 'nextRouter'
		},
		{
			path: '/permission',
			method: 'nextRouter'
		},
		{
			path: '/tenant',
			method: 'nextRouter'
		},
		{
			path: '/phone-number',
			method: 'nextRouter'
		},
		{
			path: '/contract',
			method: 'nextRouter'
		},
		{
			path: '/image',
			method: 'nextRouter'
		},
		{
			path: '/calendar-entry',
			method: 'nextRouter'
		},
		{
			path: '/wsconfig',
			method: 'get'
		},
		{
			path: '/online-users',
			method: 'get'
		},
		{
			path: '/envconfig',
			method: 'get'
		},
		{
			path: '/',
			method: 'get'
		},
		{
			path: '/checklist',
			method: 'nextRouter'
		},
		{
			path: '/feature-list',
			method: 'nextRouter'
		},
		{
			path: '/dashboard-menu',
			method: 'nextRouter'
		},
		{
			path: '/cloud-category',
			method: 'nextRouter'
		},
		{
			path: '/contract-type',
			method: 'nextRouter'
		},
		{
			path: '/log',
			method: 'nextRouter'
		},
		{
			path: '/password',
			method: 'nextRouter'
		},
		{
			path: '/refdata/',
			method: 'nextRouter'
		},
		{
			path: '/system-settings/',
			method: 'nextRouter'
		},
		{
			path: '/cloud/',
			method: 'nextRouter'
		},
		{
			path: '/region-city/',
			method: 'nextRouter'
		},
		{
			path: '/user-group',
			method: 'nextRouter'
		},
		{
			path: '/email',
			method: 'nextRouter'
		},
		{
			path: '/filter/:page',
			method: 'get'
		},
		{
			path: '/news',
			method: 'nextRouter'
		},
		{
			path: '/content-item',
			method: 'nextRouter'
		},
		{
			path: '/info',
			method: 'nextRouter'
		},
		{
			path: '/ai-context-item',
			method: 'nextRouter'
		},
		{
			path: '/registration',
			method: 'nextRouter'
		},
		{
			path: '/contacts',
			method: 'nextRouter'
		},
		{
			path: '/help',
			method: 'nextRouter'
		}
	];

	testRouter(MainRouter, targetRouteList);
});
