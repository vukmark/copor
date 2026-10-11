import {IRoute, testRouter} from '../../testHelper/Router.helper';
import {LoginRouter} from '../../../Login/router/LoginRouter';

describe('test LoginRouter', () => {
	const targetRouteList: IRoute[] = [
		{
			path: '/',
			method: 'post'
		},
		{
			path: '/refresh',
			method: 'post'
		}
	];

	testRouter(LoginRouter, targetRouteList);
});
