import {ValidateDeleteNewsRepo} from '@copor/news/domain/News/repository/ValidateDeleteNewsRepo';

export class FakeDeleteNewsValidatorStorageRepo implements ValidateDeleteNewsRepo {
	isInvalidNews(newsId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}