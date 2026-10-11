import {testController} from '../../../testHelper/Controller.helper';
import {UpdateRegionReqBodyDTO} from '../../../../Components/Region/UpdateRegion/dto/UpdateRegionReqBodyDTO';
import {UpdateRegionController} from '../../../../Components/Region/UpdateRegion/UpdateRegionController';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('test UpdateRegionController', () => {
	const requestBody: UpdateRegionReqBodyDTO = {
		id: 'id',
		community: 'com',
		city: 'city',
		country: 'country',
		state: 'state',
		postalCode: 'posCode',
		communityCode: 'cc',
		latitude: 1,
		longitude: 1,
		publishStatus: PublishStatus.published
	};

	testController(UpdateRegionController, requestBody, undefined);
});
