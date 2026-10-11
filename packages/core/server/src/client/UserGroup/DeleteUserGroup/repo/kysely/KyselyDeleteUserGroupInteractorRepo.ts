import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteUserGroupInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom('userGroupClosure')
				.where((eb) => eb.or([
					eb('ancestorId', '=', itemId),
					eb('descendantId', '=', itemId)
				])
				)
				.execute();

			await trx
				.deleteFrom('userGroup')
				.where('id', '=', itemId)
				.execute();
		});
	}
}