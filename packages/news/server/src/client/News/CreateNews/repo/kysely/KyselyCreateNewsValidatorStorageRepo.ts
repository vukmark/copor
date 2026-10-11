import {ValidateCreateNewsRepo} from '@copor/news/domain/News/repository/ValidateCreateNewsRepo';

export class KyselyCreateNewsValidatorStorageRepo implements ValidateCreateNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}