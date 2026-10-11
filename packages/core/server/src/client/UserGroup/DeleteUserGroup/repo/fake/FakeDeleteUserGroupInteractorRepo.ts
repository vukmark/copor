import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeleteUserGroupInteractorRepo implements DeleteItem {
	delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}