import {ValidateGetNewsRepo} from '@copor/news/domain/News/repository/ValidateGetNewsRepo';
import {NewsKyselyHelper} from '@copor/news/client/News/repositoryHelper/NewsKyselyHelper';

export class KyselyGetNewsValidatorStorageRepo implements ValidateGetNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return NewsKyselyHelper.isInvalidNews(newsId);
	}
}