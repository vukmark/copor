import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteContractTypeInteractorRepo implements DeleteItem {
	async delete(itemId: string): Promise<void> {
		await db
			.deleteFrom('contractType')
			.where('id', '=', itemId)
			.execute();
	}
}