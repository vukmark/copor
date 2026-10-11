import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateContentItemRepo} from '@copor/core/domain/ContentItem/repository/ValidateCreateContentItemRepo';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/fake/FakeCreateContentItemValidatorStorageRepo';
import {
	KyselyCreateContentItemValidatorStorageRepo
} from '@copor/core/client/ContentItem/CreateContentItem/repo/kysely/KyselyCreateContentItemValidatorStorageRepo';

export class CreateContentItemValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateContentItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateContentItemRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateContentItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateContentItemValidatorStorageRepo
		};
	}
}