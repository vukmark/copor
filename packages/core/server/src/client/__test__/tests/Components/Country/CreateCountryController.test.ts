import {testController} from '../../../testHelper/Controller.helper';
import {CreateCountryReqBodyDTO} from '../../../../Components/Country/CreateCountry/dto/CreateCountryReqBodyDTO';
import {CreateCountryController} from '../../../../Components/Country/CreateCountry/CreateCountryController';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('test CreateCountryController', () => {
	const requestBody: CreateCountryReqBodyDTO = {
		name: 'serbia',
		code: 'RS',
		publishStatus: PublishStatus.published
	};

	testController(CreateCountryController, requestBody, undefined);
});
