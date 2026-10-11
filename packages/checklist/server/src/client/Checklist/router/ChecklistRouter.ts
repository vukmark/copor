import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateChecklistController} from '@copor/checklist/client/Checklist/CreateChecklist/CreateChecklistController';
import {DeleteChecklistController} from '@copor/checklist/client/Checklist/DeleteChecklist/DeleteChecklistController';
import {UpdateChecklistController} from '@copor/checklist/client/Checklist/UpdateChecklist/UpdateChecklistController';
import {GetChecklistController} from '@copor/checklist/client/Checklist/GetChecklist/GetChecklistController';
import {ChecklistItemRouter} from '@copor/checklist/client/ChecklistItem/router/ChecklistItemRouter';

export class ChecklistRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateChecklistController);
		this.delete('/:id', DeleteChecklistController);
		this.patch('/', UpdateChecklistController);
		this.get('/:id', GetChecklistController);
		this.nextRouter('/item', ChecklistItemRouter);
	}
}