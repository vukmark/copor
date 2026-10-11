import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetLanguageController} from '@copor/core/client/Components/Language/GetLanguage/GetLanguageController';
import {GetLanguageListController} from '@copor/core/client/Components/Language/GetLanguageList/GetLanguageListController';
import {CreateLanguageController} from '@copor/core/client/Components/Language/CreateLanguage/CreateLanguageController';
import {DeleteLanguageController} from '@copor/core/client/Components/Language/DeleteLanguage/DeleteLanguageController';
import {UpdateLanguageController} from '@copor/core/client/Components/Language/UpdateLanguage/UpdateLanguageController';
import {GetLanguageTableController} from '@copor/core/client/Components/Language/GetLanguageTable/GetLanguageTableController';
//AUTO_IMPORT_DO_NOT_EDIT


export class LanguageRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/table', GetLanguageTableController);
		this.patch('/', UpdateLanguageController);
		this.delete('/:id', DeleteLanguageController);
		this.post('/', CreateLanguageController);
		this.get('/list', GetLanguageListController);
		this.get('/:id', GetLanguageController);
	}
}
