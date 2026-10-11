import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetHtmlPagesInteractorRepo} from '@copor/core/client/InfoPages/GetHtmlPages/kysely/KyselyGetHtmlPagesInteractorRepo';
import {FakeGetHtmlPagesInteractorRepo} from '@copor/core/client/InfoPages/GetHtmlPages/fake/FakeGetHtmlPagesInteractorRepo';


export class GetHtmlPagesRepoPicker
	extends NewRepositoryPicker<GetItem<string>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<string>> {
		return {
			[DBEnv.KYSELY]: KyselyGetHtmlPagesInteractorRepo,
			[DBEnv.FAKE]: FakeGetHtmlPagesInteractorRepo
		};
	}
}