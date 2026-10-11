import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLanguageInteractorRepo} from '../fake/FakeGetLanguageInteractorRepo';
import {
	KyselyGetLanguageInteractorRepo
} from '@copor/core/client/Components/Language/GetLanguage/repo/kysely/KyselyGetLanguageInteractorRepo';

export class GetLanguageInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetLanguageDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetLanguageInteractorRepo
		};
	}
}
