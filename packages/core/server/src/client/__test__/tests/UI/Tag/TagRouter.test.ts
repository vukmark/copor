import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {TagRouter} from '../../../../Components/Tag/router/TagRouter';

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
			path: '/public-tags',
			method: 'post'
		},
		{
			path: '/private-tags',
			method: 'get'
		},
		{
			path: '/private-tags/:searchPrompt',
			method: 'get'
		},
		{
			path: '/search/:prompt?',
			method: 'get'
		},
		{
			path: '/all-tags-for-user',
			method: 'get'
		},
		{
			path: '/all-tags-for-user/:searchPrompt',
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
			path: '/',
			method: 'patch'
		},
		{
			path: '/:id',
			method: 'delete'
		},
		{
			path: '/form/:id',
			method: 'get'
		}
	];

	testRouter(TagRouter, targetRouteList);
});

