import {FakeGetUserInteractorRepo} from '../fake/FakeGetUserInteractorRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetUserDTO} from '@copor/core/domain/User/interactor/dto/GetUserDTO';
import {KyselyGetUserInteractorRepo} from '@copor/core/client/User/GetUser/repo/kysely/KyselyGetUserInteractorRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class GetUserInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetUserDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetUserDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserInteractorRepo
		};
	}
}