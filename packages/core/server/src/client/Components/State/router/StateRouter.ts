import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateStateController} from '../CreateState/CreateStateController';
import {UpdateStateController} from '../UpdateState/UpdateStateController';
import {DeleteStateController} from '../DeleteState/DeleteStateController';
import {GetStateController} from '../GetState/GetStateController';
import {GetStateListController} from '@copor/core/client/Components/State/GetStateList/GetStateListController';
import {GetStateSimpleListController} from '@copor/core/client/Components/State/GetStateSimpleList/GetStateSimpleListController';
import {GetStateFormController} from '@copor/core/client/Components/State/GetStateForm/GetStateFormController';
import {GetStateTableController} from '@copor/core/client/Components/State/GetStateTable/GetStateTableController';
//AUTO_IMPORT_DO_NOT_EDIT

export class StateRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/table', GetStateTableController);
		this.post('/', CreateStateController);
		this.patch('/', UpdateStateController);
		this.delete('/:id', DeleteStateController);
		this.get('/list/:id?', GetStateListController);
		this.delete('/:id', DeleteStateController);
		this.get('/form', GetStateFormController);
		this.get('/simple-list/:id?', GetStateSimpleListController);
		this.get('/form/:id', GetStateFormController);
		this.get('/:id', GetStateController);
	}
}