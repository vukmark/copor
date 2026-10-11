import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {TenantRouter} from '../../../../Components/Tenant/router/TenantRouter';


describe('test TenantRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/table',
			method: 'post'
		},
		{
			path: '/base/simple-list',
			method: 'post'
		},
		{
			path: '/simple-list',
			method: 'post'
		},
		{
			path: '/search/:prompt?',
			method: 'get'
		},
		{
			path: '/base-tenant-list',
			method: 'get'
		},
		{
			path: '/list',
			method: 'post'
		},
		{
			path: '/:id',
			method: 'get'
		},
		{
			path: '/',
			method: 'post'
		},
		{
			path: '/',
			method: 'patch'
		},
		{
			path: '/:id',
			method: 'delete'
		}
	];

	testRouter(TenantRouter, targetRouteList);
});