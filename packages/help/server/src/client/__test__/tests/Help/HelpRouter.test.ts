import {IRoute, testRouter} from '@copor/core/client/__test__/testHelper/Router.helper';
import {HelpRouter} from '@copor/help/client/Help/router/HelpRouter';

describe('test HelpRouter', () => {
	const targetRouteList: IRoute[] = [
		{path: '/changelog', method: 'get'},
		{path: '/changelog/:version', method: 'get'}
	];

	testRouter(HelpRouter, targetRouteList);
});
