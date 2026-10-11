import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteAiContextItemInteractorRepo
implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('aiContextItem')
			.where('id', '=', itemId)
			.execute();
	}
}