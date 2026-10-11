import {testController} from '../../../testHelper/Controller.helper';
import {CreateRegionReqBodyDTO} from '../../../../Components/Region/CreateRegion/dto/CreateRegionReqBodyDTO';
import {CreateRegionController} from '../../../../Components/Region/CreateRegion/CreateRegionController';

describe('test CreateRegionController', () => {
	const requestBody: CreateRegionReqBodyDTO = {
		country: 'cid',
		state: 'sid',
		postalCode: '79220'
	};

	testController(CreateRegionController, requestBody, undefined);
});
