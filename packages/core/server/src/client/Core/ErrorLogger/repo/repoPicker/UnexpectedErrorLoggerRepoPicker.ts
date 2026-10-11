import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {UnexpectedErrorLoggerRepo} from '@copor/core/domain/Core/Repository/UnexpectedErrorLoggerRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUnexpectedErrorLoggerRepo} from '@copor/core/client/Core/ErrorLogger/repo/fake/FakeUnexpectedErrorLoggerRepo';
import {KyselyUnexpectedErrorLoggerRepo} from '@copor/core/client/Core/ErrorLogger/repo/kysely/KyselyUnexpectedErrorLoggerRepo';

export class UnexpectedErrorLoggerRepoPicker extends NewRepositoryPicker<UnexpectedErrorLoggerRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => UnexpectedErrorLoggerRepo> {
		return {
			[DBEnv.FAKE]: FakeUnexpectedErrorLoggerRepo,
			[DBEnv.KYSELY]: KyselyUnexpectedErrorLoggerRepo
		};
	}
}