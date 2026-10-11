import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteRoleInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('role')
			.where('id', '=', itemId)
			.execute();
	}
}