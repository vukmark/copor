import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {testController} from '../../../testHelper/Controller.helper';
import {UpdateLanguageReqBodyDTO} from '../../../../Components/Language/UpdateLanguage/dto/UpdateLanguageReqBodyDTO';
import {UpdateLanguageController} from '../../../../Components/Language/UpdateLanguage/UpdateLanguageController';
describe('test Update Language Controller', () => {
	const requestBody: UpdateLanguageReqBodyDTO = {
		id: 'uniqueId',
		name: 'updated language',
		code: 'ln',
		nativeName: 'nn',
		publishStatus: PublishStatus.published
	};

	testController(UpdateLanguageController, requestBody, undefined);
});
