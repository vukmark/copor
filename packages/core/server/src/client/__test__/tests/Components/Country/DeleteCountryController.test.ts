import {testController} from '../../../testHelper/Controller.helper';
import {
	DeleteCountryController,
	DeleteCountryParams
} from '../../../../Components/Country/DeleteCountry/DeleteCountryController';

describe('test DeleteCountryController', () => {
	const deleteCountryRequestParams: DeleteCountryParams = {
		id: '33'
	};

	testController(DeleteCountryController, undefined, deleteCountryRequestParams);
});
