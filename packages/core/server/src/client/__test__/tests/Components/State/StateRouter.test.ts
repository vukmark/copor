import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {StateRouter} from '../../../../Components/State/router/StateRouter';

describe('test StateRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/table',
			method: 'post'
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
		},
		{
			path: '/list/:id?',
			method: 'get'
		},
		{
			path: '/:id',
			method: 'delete'
		},
		{
			path: '/form',
			method: 'get'
		},
		{
			path: '/simple-list/:id?',
			method: 'get'
		},
		{
			path: '/form/:id',
			method: 'get'
		},
		{
			path: '/:id',
			method: 'get'
		}
	];

	testRouter(StateRouter, targetRouteList);
});