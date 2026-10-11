import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyUpdateContentItemInteractorRepo implements SaveItem<SaveContentItemDTO> {
	async save(saveDTO: SaveContentItemDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.updateTable('contentItem')
				.set({
					title: saveDTO.title,
					summary: saveDTO.summary,
					content: saveDTO.content,
					publishStatus: saveDTO.publishStatus,
					... TimestampHelper.getTimestampForUpdate(saveDTO.actorId)
				})
				.where('id', '=', saveDTO.id)
				.execute();

			if (saveDTO.roleId !== undefined) {
				await trx
					.deleteFrom('contentItemRoleMap')
					.where('contentItemId', '=', saveDTO.id)
					.execute();

				const validRoleIds = saveDTO.roleId.filter(
					(id): id is string => id != null && id !== ''
				);

				if (validRoleIds.length > 0) {
					await trx
						.insertInto('contentItemRoleMap')
						.values(
							validRoleIds.map((roleId) => ({
								contentItemId: saveDTO.id,
								roleId
							}))
						)
						.execute();
				}
			}
		});
	}
}