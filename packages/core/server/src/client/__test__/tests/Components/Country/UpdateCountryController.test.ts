import {testController} from '../../../testHelper/Controller.helper';
import {UpdateCountryReqBodyDTO} from '../../../../Components/Country/UpdateCountry/dto/UpdateCountryReqBodyDTO';
import {UpdateCountryController} from '../../../../Components/Country/UpdateCountry/UpdateCountryController';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

describe('test UpdateCountryController', () => {
	const requestBody: UpdateCountryReqBodyDTO = {
		id: '0932',
		name: 'serbia',
		code: 'RS',
		publishStatus: PublishStatus.published
	};

	testController(UpdateCountryController, requestBody, undefined);
});
