import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateRegionController} from '../CreateRegion/CreateRegionController';
import {DeleteRegionController} from '../DeleteRegion/DeleteRegionController';
import {UpdateRegionController} from '../UpdateRegion/UpdateRegionController';
import {GetRegionController} from '../GetRegion/GetRegionController';
import {GetRegionListController} from '../GetRegionList/GetRegionListController';
import {GetRegionFormController} from '@copor/core/client/Components/Region/GetRegionForm/GetRegionFormController';
import {GetRegionTableController} from '@copor/core/client/Components/Region/GetRegionTable/GetRegionTableController';
import {
	GetRegionSimpleListController
} from '@copor/core/client/Components/Region/GetRegionSimpleList/GetRegionSimpleListController';
//AUTO_IMPORT_DO_NOT_EDIT
export class RegionRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/table', GetRegionTableController);
		this.post('/simple-list', GetRegionSimpleListController);
		this.get('/form', GetRegionFormController);
		this.post('/list/', GetRegionListController);
		this.get('/list/:prompt', GetRegionListController);
		this.get('/:id', GetRegionController);
		this.patch('/', UpdateRegionController);
		this.delete('/:id', DeleteRegionController);
		this.post('/', CreateRegionController);
		this.get('/form/:id', GetRegionFormController);
	}
}
