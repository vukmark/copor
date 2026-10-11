import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNativeLanguageInteractorRepo} from '../fake/FakeCreateNativeLanguageInteractorRepo';
import {
	KyselyCreateNativeLanguageInteractorRepo
} from '@copor/core/client/Components/NativeLanguage/CreateNativeLanguage/repo/kysely/KyselyCreateNativeLanguageInteractorRepo';

export class CreateNativeLanguageInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveNativeLanguageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveNativeLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateNativeLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateNativeLanguageInteractorRepo
		};
	}
}
