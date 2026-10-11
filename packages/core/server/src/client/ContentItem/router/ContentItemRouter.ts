import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateContentItemController} from '@copor/core/client/ContentItem/CreateContentItem/CreateContentItemController';
import {GetContentItemController} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemController';
import {GetContentItemListController} from '@copor/core/client/ContentItem/GetContentItemList/GetContentItemListController';
import {DeleteContentItemController} from '@copor/core/client/ContentItem/DeleteContentItem/DeleteContentItemController';
import {GetContentItemTableController} from '@copor/core/client/ContentItem/GetContentItemTable/GetContentItemTableController';
import {GetContentItemFormController} from '@copor/core/client/ContentItem/GetContentItemForm/GetContentItemFormController';
import {UpdateContentItemController} from '@copor/core/client/ContentItem/UpdateContentItem/UpdateContentItemController';

export class ContentItemRouter extends BaseRouter {
	protected initializeRoutes() {
		this.post('/table', GetContentItemTableController);
		this.post('/', CreateContentItemController);

		this.get('/form', GetContentItemFormController);

		this.post('/list', GetContentItemListController);
		this.get('/:id', GetContentItemController);

		this.patch('/', UpdateContentItemController);
		this.delete('/:id', DeleteContentItemController);

		this.get('/form/:id', GetContentItemFormController);
	}
}