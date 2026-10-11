import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateChecklistItemController} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/CreateChecklistItemController';
import {DeleteChecklistItemController} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/DeleteChecklistItemController';
import {UpdateChecklistItemController} from '@copor/checklist/client/ChecklistItem/UpdateChecklistItem/UpdateChecklistItemController';
import {
	GetChecklistItemListController
} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/GetChecklistItemListController';

export class ChecklistItemRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/', CreateChecklistItemController);
		this.delete('/:id', DeleteChecklistItemController);
		this.patch('/', UpdateChecklistItemController);
		this.get('/:checklistId', GetChecklistItemListController);
	}
}