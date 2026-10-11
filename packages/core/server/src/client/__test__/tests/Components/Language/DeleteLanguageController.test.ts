import {DeleteCountryController} from '../../../../Components/Country/DeleteCountry/DeleteCountryController';
import {testController} from '../../../testHelper/Controller.helper';
import {DeleteLanguageParams} from '../../../../Components/Language/DeleteLanguage/DeleteLanguageController';

describe('test DeleteLanguageController', () => {
	const deleteLanguageRequestParams: DeleteLanguageParams = {
		id: '33'
	};

	testController(DeleteCountryController, undefined, deleteLanguageRequestParams);
});
