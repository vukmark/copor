import {IRoute, testRouter} from '@copor/core/client/__test__/testHelper/Router.helper';
import {ToDoRouter} from '../../../ToDo/router/ToDoRouter';

describe('test ToDoRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/',
			method: 'patch'
		},
		{
			path: '/',
			method: 'post'
		},
		{
			path: '/get-all-for-user',
			method: 'post'
		},
		{
			path: '/comment',
			method: 'nextRouter'
		},
		{
			path: '/alarm',
			method: 'nextRouter'
		},
		{
			path: '/attachment',
			method: 'nextRouter'
		},
		{
			path: '/:id/:type',
			method: 'get'
		},
		{
			path: '/:id/:type',
			method: 'delete'
		}
	];

	testRouter(ToDoRouter, targetRouteList);
});
