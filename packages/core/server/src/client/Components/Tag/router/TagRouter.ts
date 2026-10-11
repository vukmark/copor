import {CreateTagController} from '../CreateTag/CreateTagController';
import {UpdateTagController} from '../UpdateTag/UpdateTagController';
import {DeleteTagController} from '../DeleteTag/DeleteTagController';
import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {SearchTagListController} from '../SearchTagList/SearchTagListController';
import {GetPrivateTagListForUserController} from '../GetPrivateTagListForUser/GetPrivateTagListForUserController';
import {GetTagController} from '@copor/core/client/Components/Tag/GetTag/GetTagController';
import {GetPublicTagListController} from '@copor/core/client/Components/Tag/GetPublicTagList/GetPublicTagListController';
import {GetTagFormController} from '@copor/core/client/Components/Tag/GetTagForm/GetTagFormController';
import {GetPublicTagTableController} from '@copor/core/client/Components/Tag/GetTagTable/GetPublicTagTableController';
import {GetAllTagsForUserController} from '@copor/core/client/Components/Tag/GetAllTagsForUser/GetAllTagsForUserController';

export class TagRouter extends BaseRouter {
	protected initializeRoutes(): void {
		this.post('/table', GetPublicTagTableController);
		this.get('/form', GetTagFormController);
		this.post('/public-tags', GetPublicTagListController);
		this.get('/private-tags', GetPrivateTagListForUserController);
		this.get('/private-tags/:searchPrompt', GetPrivateTagListForUserController);
		this.get('/search/:prompt?', SearchTagListController);
		this.get('/all-tags-for-user', GetAllTagsForUserController);
		this.get('/all-tags-for-user/:searchPrompt', GetAllTagsForUserController);
		this.get('/:id', GetTagController);
		this.post('/', CreateTagController);
		this.patch('/', UpdateTagController);
		this.delete('/:id', DeleteTagController);
		this.get('/form/:id', GetTagFormController);
	}
}
