import {db} from '@copor/core/client/AppDataSource';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class KyselyDeleteChecklistInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('checklist')
			.where('id', '=', itemId)
			.execute();
	}
}