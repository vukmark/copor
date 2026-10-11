import {ValidateDeleteNewsRepo} from '@copor/news/domain/News/repository/ValidateDeleteNewsRepo';
import {NewsKyselyHelper} from '@copor/news/client/News/repositoryHelper/NewsKyselyHelper';

export class KyselyDeleteNewsValidatorStorageRepo implements
    ValidateDeleteNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return NewsKyselyHelper.isInvalidNews(newsId);
	}
	entityHasReferences(newsId: string): Promise<{tableName: string} | false> {
		return NewsKyselyHelper.newsHasReferences(newsId);
	}
}