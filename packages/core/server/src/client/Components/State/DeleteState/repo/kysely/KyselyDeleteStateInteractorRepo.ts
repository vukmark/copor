import {db} from '@copor/core/client/AppDataSource';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class KyselyDeleteStateInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('state')
			.where('id', '=', itemId)
			.execute();
	}
}
