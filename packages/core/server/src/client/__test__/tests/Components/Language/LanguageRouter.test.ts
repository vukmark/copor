import {IRoute, testRouter} from '../../../testHelper/Router.helper';
import {LanguageRouter} from '../../../../Components/Language/router/RouterLanguage';

describe('test LanguageRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/table',
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
			path: '/',
			method: 'post'
		},
		{
			path: '/list',
			method: 'get'
		},
		{
			path: '/:id',
			method: 'get'
		}
	];

	testRouter(LanguageRouter, targetRouteList);
});

