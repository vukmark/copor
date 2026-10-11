import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {testController} from '../../../testHelper/Controller.helper';
import {CreateTagReqBodyDTO} from '../../../../Components/Tag/CreateTag/dto/CreateTagReqBodyDTO';
import {CreateTagController} from '../../../../Components/Tag/CreateTag/CreateTagController';
import {Color} from '@copor/core/domain/Core/enum/Color';

describe('test CreateTagController', () => {
	const requestBody: CreateTagReqBodyDTO = {
		name: 'newTag',
		color: Color.cyan,
		isPrivate: true,
		colorSet: ColorSet.SET9
	};

	testController(CreateTagController, requestBody, undefined);
});
