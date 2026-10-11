import {testController} from '../../../testHelper/Controller.helper';
import {DeleteStateController, DeleteStateParams} from '../../../../Components/State/DeleteState/DeleteStateController';

describe('test DeleteSectionController', () => {
	const deleteStateRequestParams: DeleteStateParams = {
		id: '11'
	};

	testController(DeleteStateController, undefined, deleteStateRequestParams);
});