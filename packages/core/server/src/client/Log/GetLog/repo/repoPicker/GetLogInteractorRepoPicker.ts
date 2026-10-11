import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLogInteractorRepo} from '../fake/FakeGetLogInteractorRepo';
import {GetLogDTO} from '@copor/core/domain/Log/interactor/dto/GetLogDTO';
import {KyselyGetLogInteractorRepo} from '@copor/core/client/Log/GetLog/repo/kysely/KyselyGetLogInteractorRepo';

export class GetLogInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetLogDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetLogDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetLogInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetLogInteractorRepo
		};
	}
}
