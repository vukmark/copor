import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {testController} from '../../../testHelper/Controller.helper';
import {UpdateTagReqBodyDTO} from '../../../../Components/Tag/UpdateTag/dto/UpdateTagReqBodyDTO';
import {UpdateTagController} from '../../../../Components/Tag/UpdateTag/UpdateTagController';
import {Color} from '@copor/core/domain/Core/enum/Color';

describe('test UpdateTagController', () => {
	const requestBody: UpdateTagReqBodyDTO = {
		id: '0932',
		name: 'serbia',
		color: Color.black,
		actorId: '1',
		isPrivate: true,
		colorSet: ColorSet.SET9
	};

	testController(UpdateTagController, requestBody, undefined);
});
