import {ValidateUpdateNewsRepo} from '@copor/news/domain/News/repository/ValidateUpdateNewsRepo';

export class FakeUpdateNewsValidatorStorageRepo
implements ValidateUpdateNewsRepo {
	public isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}