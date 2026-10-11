import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeleteCloudCategoryInteractorRepo implements DeleteItem {
	delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}