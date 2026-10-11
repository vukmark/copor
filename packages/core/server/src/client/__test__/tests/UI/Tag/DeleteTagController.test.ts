import {testController} from '../../../testHelper/Controller.helper';
import {DeleteTagController, DeleteTagParams} from '../../../../Components/Tag/DeleteTag/DeleteTagController';

describe('test DeleteTag', () => {
	const deleteTagRequestParams: DeleteTagParams = {
		id: 'id'
	};

	testController(DeleteTagController, undefined, deleteTagRequestParams);
});
