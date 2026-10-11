import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeleteNativeLanguageInteractorRepo implements DeleteItem {
	delete(itemId: string): Promise<void> {
		return Promise.resolve();
	}
}