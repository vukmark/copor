import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNativeLanguageListInteractorRepo} from '../fake/FakeGetNativeLanguageListInteractorRepo';
import {
	KyselyGetNativeLanguageListInteractorRepo
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/kysely/KyselyGetNativeLanguageListInteractorRepo';

export class GetNativeLanguageListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetNativeLanguageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetNativeLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetNativeLanguageListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetNativeLanguageListInteractorRepo
		};
	}
}
