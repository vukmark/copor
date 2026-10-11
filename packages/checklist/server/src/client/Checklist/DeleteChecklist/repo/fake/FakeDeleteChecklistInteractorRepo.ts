import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class FakeDeleteChecklistInteractorRepo implements DeleteItem {
	delete(id: string): Promise<void> {
		return Promise.resolve();
	}
}