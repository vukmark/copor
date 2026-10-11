import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteAlarmInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('alarm')
			.where('id', '=', itemId)
			.execute();
	}
}