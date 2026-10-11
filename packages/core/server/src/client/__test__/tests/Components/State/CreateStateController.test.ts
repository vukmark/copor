import {testController} from '../../../testHelper/Controller.helper';
import {CreateStateReqBodyDTO} from '../../../../Components/State/CreateState/dto/CreateStateReqBodyDTO';
import {CreateStateController} from '../../../../Components/State/CreateState/CreateStateController';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('test CreateStateController', () => {
	const requestBody: CreateStateReqBodyDTO = {
		name: 'state update',
		code: 'sr',
		countryId: '11',
		publishStatus: PublishStatus.published
	};

	testController(CreateStateController, requestBody, undefined);
});
