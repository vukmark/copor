import {BaseRouter} from '../../Core/BaseRouter';
import {SignContractController} from '../SignContract/SignContractController';
//AUTO_IMPORT_DO_NOT_EDIT

export class ContractRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/sign', SignContractController);
	}
}
