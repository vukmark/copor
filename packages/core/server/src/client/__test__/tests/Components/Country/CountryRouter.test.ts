import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {CountryRouter} from '../../../../Components/Country/router/CountryRouter';

describe('test CountryRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/table',
			method: 'post'
		},
		{
			path: '/form',
			method: 'get'
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
			path: '/:id',
			method: 'delete'
		},
		{
			path: '/list',
			method: 'post'
		},
		{
			path: '/simple-list',
			method: 'post'
		},
		{
			path: '/',
			method: 'patch'
		},
		{
			path: '/form/:id',
			method: 'get'
		}
	];

	testRouter(CountryRouter, targetRouteList);
});

