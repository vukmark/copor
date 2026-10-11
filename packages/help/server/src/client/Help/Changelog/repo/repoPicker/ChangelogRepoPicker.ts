import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ChangelogRepo} from '@copor/help/domain/Help/Changelog/repository/ChangelogRepo';
import {FileChangelogRepo} from '@copor/help/client/Help/Changelog/repo/file/FileChangelogRepo';

export class ChangelogRepoPicker extends NewRepositoryPicker<ChangelogRepo> {
	protected getRepositoryList(): Record<string, new () => ChangelogRepo> {
		return {
			[DBEnv.FAKE]: FileChangelogRepo,
			[DBEnv.KYSELY]: FileChangelogRepo
		};
	}
}
