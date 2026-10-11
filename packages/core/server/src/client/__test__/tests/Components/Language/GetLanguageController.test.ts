import {testController} from '../../../testHelper/Controller.helper';
import {
	GetLanguageController,
	GetLanguageParams
} from '../../../../Components/Language/GetLanguage/GetLanguageController';

describe('test GetLanguageController', () => {
	const requestParams: GetLanguageParams = {
		id: '32'
	};

	testController(GetLanguageController, undefined, requestParams);
});
