import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {CreateNewsController} from '@copor/news/client/News/CreateNews/CreateNewsController';
import {GetNewsController} from '@copor/news/client/News/GetNews/GetNewsController';
import {DeleteNewsController} from '@copor/news/client/News/DeleteNews/DeleteNewsController';
import {UpdateNewsController} from '@copor/news/client/News/UpdateNews/UpdateNewsController';
import {GetNewsListController} from '@copor/news/client/News/GetNewsList/GetNewsListController';
import {GetNewsFormController} from '@copor/news/client/News/GetNewsForm/GetNewsFormController';
import {GetNewsTableController} from '@copor/news/client/News/GetNewsTable/GetNewsTableController';

export class NewsRouter extends BaseRouter {
	protected initializeRoutes() {
		this.post('/table', GetNewsTableController);
		this.post('/', CreateNewsController);

		this.get('/form', GetNewsFormController);

		this.post('/list', GetNewsListController);
		this.get('/:id', GetNewsController);

		this.patch('/', UpdateNewsController);
		this.delete('/:id', DeleteNewsController);

		this.get('/form/:id', GetNewsFormController);
	}
}