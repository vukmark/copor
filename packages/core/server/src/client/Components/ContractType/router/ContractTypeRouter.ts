import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {
	CreateContractTypeController
} from '@copor/core/client/Components/ContractType/CreateContractType/CreateContractTypeController';
import {
	DeleteContractTypeController
} from '@copor/core/client/Components/ContractType/DeleteContractType/DeleteContractTypeController';
import {GetContractTypeController} from '@copor/core/client/Components/ContractType/GetContractType/GetContractTypeController';
import {
	GetContractTypeListController
} from '@copor/core/client/Components/ContractType/GetContractTypeList/GetContractTypeListController';
import {
	UpdateContractTypeController
} from '@copor/core/client/Components/ContractType/UpdateContractType/UpdateContractTypeController';
import {
	GetContractTypeFormController
} from '@copor/core/client/Components/ContractType/GetContractTypeForm/GetContractTypeFormController';
import {
	GetContractTypeTableController
} from '@copor/core/client/Components/ContractType/GetContractTypeTable/GetContractTypeTableController';

export class ContractTypeRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetContractTypeTableController);
		this.get('/form', GetContractTypeFormController);
		this.patch('/', UpdateContractTypeController);
		this.post('/list', GetContractTypeListController);
		this.delete('/:id', DeleteContractTypeController);
		this.get('/:id', GetContractTypeController);
		this.post('/', CreateContractTypeController);
		this.get('/form/:id', GetContractTypeFormController);
	}
}