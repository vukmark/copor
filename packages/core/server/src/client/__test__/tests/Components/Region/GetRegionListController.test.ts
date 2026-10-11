import {testController} from '../../../testHelper/Controller.helper';
import {GetRegionListController} from '../../../../Components/Region/GetRegionList/GetRegionListController';

describe('test GetRegionListController', () => {
	testController(GetRegionListController, {filterList: [], limit: '10', offset: '0'}, undefined);
});
