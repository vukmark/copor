import {testController} from '../../../testHelper/Controller.helper';
import {GetCountryListController} from '../../../../Components/Country/GetCountryList/GetCountryListController';

describe('test GetCountryListController', () => {
	testController(GetCountryListController, {filterList: [], limit: '10', offset: '0'}, undefined);
});
