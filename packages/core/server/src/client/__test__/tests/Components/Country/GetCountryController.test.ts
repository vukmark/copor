import {testController} from '../../../testHelper/Controller.helper';
import {GetCountryController} from '../../../../Components/Country/GetCountry/GetCountryController';

describe('test GetCountryController', () => {
	const requestParams = {
		id: '32'
	};

	testController(GetCountryController, undefined, requestParams);
});
