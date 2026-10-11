import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {RegionRouter} from '../../../../Components/Region/router/RouterRegion';

describe('test RegionRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/table',
			method: 'post'
		},
		{
			path: '/simple-list',
			method: 'post'
		},
		{
			path: '/form',
			method: 'get'
		},
		{
			path: '/list/',
			method: 'post'
		},
		{
			path: '/list/:prompt',
			method: 'get'
		},
		{
			path: '/:id',
			method: 'get'
		},
		{
			path: '/',
			method: 'patch'
		},
		{
			path: '/:id',
			method: 'delete'
		},
		{
			path: '/',
			method: 'post'
		},
		{
			path: '/form/:id',
			method: 'get'
		}
	];

	testRouter(RegionRouter, targetRouteList);
});

