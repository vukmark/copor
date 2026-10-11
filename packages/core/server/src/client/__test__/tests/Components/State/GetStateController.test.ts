import {GetStateController} from '../../../../Components/State/GetState/GetStateController';
import {testController} from '../../../testHelper/Controller.helper';

describe('test GetStateController', () => {
	const requestParams = {
		id: '32'
	};

	testController(GetStateController, undefined, requestParams);
});