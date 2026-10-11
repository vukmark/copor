import {db} from '@copor/core/client/AppDataSource';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class KyselyDeleteTenantInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('tenant')
			.where('id', '=', itemId)
			.execute();
	}
}
