import {ValidateGetNewsRepo} from '@copor/news/domain/News/repository/ValidateGetNewsRepo';

export class FakeGetNewsValidatorStorageRepo implements ValidateGetNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}