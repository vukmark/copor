import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateAiContextItemController} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/CreateAiContextItemController';
import {DeleteAiContextItemController} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/DeleteAiContextItemController';
import {GetAiContextItemController} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/GetAiContextItemController';
import {UpdateAiContextItemController} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/UpdateAiContextItemController';
import {
	GetAiContextItemListController
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/GetAiContextItemListController';
import {
	GetAiContextItemFormController
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemForm/GetAiContextItemFormController';
import {
	GetAiContextItemTableController
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemTable/GetAiContextItemTableController';

export class AiContextItemRouter extends BaseRouter {
	protected initializeRoutes() {
		this.post('/table', GetAiContextItemTableController);

		this.post('/', CreateAiContextItemController);
		this.get('/form', GetAiContextItemFormController);

		this.post('/list', GetAiContextItemListController);
		this.delete('/:id', DeleteAiContextItemController);

		this.get('/:id', GetAiContextItemController);
		this.patch('/', UpdateAiContextItemController);

		this.get('/form/:id', GetAiContextItemFormController);
	}
}