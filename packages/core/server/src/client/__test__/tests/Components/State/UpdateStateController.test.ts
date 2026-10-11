import {testController} from '../../../testHelper/Controller.helper';
import {UpdateStateReqBodyDTO} from '../../../../Components/State/UpdateState/dto/UpdateStateReqBodyDTO';
import {UpdateStateController} from '../../../../Components/State/UpdateState/UpdateStateController';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('test UpdateStateController', () => {
	const requestBody: UpdateStateReqBodyDTO = {
		id: '032',
		name: 'state update',
		code: 'sr',
		countryId: '11',
		publishStatus: PublishStatus.published
	};

	testController(UpdateStateController, requestBody, undefined);
});
