import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNativeLanguageInteractorRepo} from '../fake/FakeGetNativeLanguageInteractorRepo';
import {
	KyselyGetNativeLanguageInteractorRepo
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguage/repo/kysely/KyselyGetNativeLanguageInteractorRepo';

export class GetNativeLanguageInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetNativeLanguageDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetNativeLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetNativeLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetNativeLanguageInteractorRepo
		};
	}
}
