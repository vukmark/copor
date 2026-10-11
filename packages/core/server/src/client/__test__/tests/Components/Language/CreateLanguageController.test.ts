import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {testController} from '../../../testHelper/Controller.helper';
import {CreateLanguageReqBodyDTO} from '../../../../Components/Language/CreateLanguage/dto/CreateLanguageReqBodyDTO';
import {CreateLanguageController} from '../../../../Components/Language/CreateLanguage/CreateLanguageController';

describe('test CreateLanguageController', () => {
	const requestBody: CreateLanguageReqBodyDTO = {
		name: 'serbian',
		code: 'RS',
		nativeName: 'srpski',
		publishStatus: PublishStatus.published
	};

	testController(CreateLanguageController, requestBody, undefined);
});
