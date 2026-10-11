import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {GetContactListController} from '@copor/contacts/client/Contacts/GetContactList/GetContactListController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

describe('test GetContactListController', () => {
	const requestBody: GetListReqBodyDTO = {
		filterList: [{name: 'SEARCH', values: ['jo']}],
		limit: '20',
		offset: '0'
	};

	testController(GetContactListController, requestBody, undefined);
});
