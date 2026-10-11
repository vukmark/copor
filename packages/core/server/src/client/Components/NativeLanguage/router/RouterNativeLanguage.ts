import {BaseRouter} from '@copor/core/client/Core/BaseRouter';
import {GetNativeLanguageController} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguage/GetNativeLanguageController';
import {GetNativeLanguageListController} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/GetNativeLanguageListController';
import {CreateNativeLanguageController} from '@copor/core/client/Components/NativeLanguage/CreateNativeLanguage/CreateNativeLanguageController';
import {DeleteNativeLanguageController} from '@copor/core/client/Components/NativeLanguage/DeleteNativeLanguage/DeleteNativeLanguageController';
import {UpdateNativeLanguageController} from '@copor/core/client/Components/NativeLanguage/UpdateNativeLanguage/UpdateNativeLanguageController';
import {GetNativeLanguageTableController} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageTable/GetNativeLanguageTableController';
import {GetNativeLanguageSimpleListController}
	from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageSimpleList/GetNativeLanguageSimpleListController';
//AUTO_IMPORT_DO_NOT_EDIT


export class NativeLanguageRouter extends BaseRouter {
	protected initializeRoutes(): void {
		//AUTO_INSERT_DO_NOT_EDIT
		this.post('/table', GetNativeLanguageTableController);
		this.patch('/', UpdateNativeLanguageController);
		this.delete('/:id', DeleteNativeLanguageController);
		this.post('/', CreateNativeLanguageController);
		this.get('/list', GetNativeLanguageListController);
		this.get('/:id', GetNativeLanguageController);
		this.post('/simple-list/', GetNativeLanguageSimpleListController);
	}
}
