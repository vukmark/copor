import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteNewsInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom('newsRoleMap')
				.where('newsId', '=', itemId)
				.execute();

			await trx
				.deleteFrom('news')
				.where('id', '=', itemId)
				.execute();
		});
	}
}