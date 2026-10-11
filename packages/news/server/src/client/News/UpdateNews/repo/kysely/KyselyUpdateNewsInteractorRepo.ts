import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyUpdateNewsInteractorRepo
implements SaveItem<SaveNewsDTO> {
	async save(saveDTO: SaveNewsDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.updateTable('news')
				.set({
					title: saveDTO.title,
					summary: saveDTO.summary,
					content: saveDTO.content,
					publishStatus: saveDTO.publishStatus,
					... TimestampHelper.getTimestampForUpdate(saveDTO.actorId)
				})
				.where('id', '=', saveDTO.id)
				.execute();

			await trx
				.deleteFrom('newsRoleMap')
				.where('newsId', '=', saveDTO.id)
				.execute();

			const validRoleIds = saveDTO.roleId.filter(
				(id): id is string => id != null && id !== ''
			);

			if (validRoleIds.length > 0) {
				await trx
					.insertInto('newsRoleMap')
					.values(
						validRoleIds.map((roleId) => ({
							newsId: saveDTO.id,
							roleId
						}))
					)
					.execute();
			}
		});
	}
}