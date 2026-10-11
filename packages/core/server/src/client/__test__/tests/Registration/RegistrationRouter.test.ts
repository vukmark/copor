import {IRoute, testRouter} from '../../testHelper/Router.helper';
import {RegistrationRouter} from '@copor/core/client/Registration/router/RegistrationRouter';

describe('test RegistrationRouter', () => {
	const targetRouteList: IRoute[] = [
		{path: '/status', method: 'get'},
		{path: '/', method: 'post'},
		{path: '/verify', method: 'post'},
		{path: '/resend-code', method: 'post'}
	];

	testRouter(RegistrationRouter, targetRouteList);
});
