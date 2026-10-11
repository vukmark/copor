import {testController} from '@copor/core/client/__test__/testHelper/Controller.helper';
import {GetVuMeetContactListController} from '@copor/vu_meet/client/VuMeet/Core/GetVuMeetContactList/GetVuMeetContactListController';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';

describe('test GetVuMeetContactListController', () => {
	const requestBody: GetListReqBodyDTO = {
		filterList: [{name: 'SEARCH', values: ['mi']}],
		limit: '20',
		offset: '0'
	};

	testController(GetVuMeetContactListController, requestBody, undefined);
});
