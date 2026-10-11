import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {GetShareRecipientListController} from '@copor/cloud/client/Cloud/GetShareRecipientList/GetShareRecipientListController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

describe('test GetShareRecipientListController', () => {
	const requestBody: GetListReqBodyDTO = {
		filterList: [{name: 'SEARCH', values: ['jo']}],
		limit: '20',
		offset: '0'
	};

	testController(GetShareRecipientListController, requestBody, undefined);
});
