import {testController} from '../../../testHelper/Controller.helper';
import {GetRegionController} from '../../../../Components/Region/GetRegion/GetRegionController';


describe('test GetRegionController', () => {
	const requestParams = {
		id: '32'
	};

	testController(GetRegionController, undefined, requestParams);
});
