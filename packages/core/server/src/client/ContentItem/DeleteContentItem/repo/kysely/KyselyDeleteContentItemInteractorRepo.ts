import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {db} from '@copor/core/client/AppDataSource';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';

export class KyselyDeleteContentItemInteractorRepo implements DeleteItem {
	public async delete(itemId: string): Promise<void> {
		const contentItem = await db
			.selectFrom('contentItem')
			.select('contentType')
			.where('id', '=', itemId)
			.executeTakeFirst();

		if (!contentItem)
			throw new Error(`ContentItem with id ${itemId} not found`);

		if (contentItem.contentType === ContentType.TERMS_AND_CONDITIONS)
			return;

		await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom('contentItemRoleMap')
				.where('contentItemId', '=', itemId)
				.execute();
			await trx
				.deleteFrom('contentItem')
				.where('id', '=', itemId)
				.execute();
		});
	}
}