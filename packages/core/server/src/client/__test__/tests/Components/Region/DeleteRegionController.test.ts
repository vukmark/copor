import {testController} from '../../../testHelper/Controller.helper';
import {
	DeleteRegionController,
	DeleteRegionParams
} from '../../../../Components/Region/DeleteRegion/DeleteRegionController';


describe('test DeleteRegionController', () => {
	const deleteRegionRequestParams: DeleteRegionParams = {
		id: '33'
	};

	testController(DeleteRegionController, undefined, deleteRegionRequestParams);
});
