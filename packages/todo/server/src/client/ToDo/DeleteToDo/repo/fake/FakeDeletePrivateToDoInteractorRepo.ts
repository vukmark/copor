import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeletePrivateToDoInteractorRepo implements DeleteItem {
	delete(itemId: string): Promise<void> {
		return Promise.resolve();
	}
}