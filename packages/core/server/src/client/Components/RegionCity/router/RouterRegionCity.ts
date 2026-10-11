import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateRegionCityController} from '@copor/core/client/Components/RegionCity/CreateRegionCity/CreateRegionCityController';
import {UpdateRegionCityController} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/UpdateRegionCityController';
import {GetRegionCityController} from '@copor/core/client/Components/RegionCity/GetRegionCity/GetRegionCityController';
import {GetRegionCityListController} from '@copor/core/client/Components/RegionCity/GetRegionCityList/GetRegionCityListController';
import {
	GetRegionCitySimpleListController
} from '@copor/core/client/Components/RegionCity/GetRegionCitySimpleList/GetRegionCitySimpleListController';
import {
	GetRegionCityTableController
} from '@copor/core/client/Components/RegionCity/GetRegionCityTable/GetRegionCityTableController';
import {GetRegionCityFormController} from '@copor/core/client/Components/RegionCity/GetRegionCityForm/GetRegionCityFormController';
import {DeleteRegionCityController} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/DeleteRegionCityController';

export class RouterRegionCity extends BaseRouter {
	protected initializeRoutes() {
		this.post('/table', GetRegionCityTableController);
		this.post('/', CreateRegionCityController);
		this.patch('/', UpdateRegionCityController);
		this.post('/list', GetRegionCityListController);
		this.post('/simple-list', GetRegionCitySimpleListController);
		this.delete('/:id', DeleteRegionCityController);

		this.get('/form/:id', GetRegionCityFormController);
		this.get('/form', GetRegionCityFormController);

		this.get('/:id', GetRegionCityController);
	}
}