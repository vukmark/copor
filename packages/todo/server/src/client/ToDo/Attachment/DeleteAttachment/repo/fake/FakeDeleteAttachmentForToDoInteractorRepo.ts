import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeleteAttachmentForToDoInteractorRepo implements DeleteItem {
	delete(itemId: string): Promise<void> {
		return Promise.resolve();
	}
}
