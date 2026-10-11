import {SaveContentItemRepo} from '@copor/core/domain/ContentItem/repository/SaveContentItemRepo';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {SaveContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/SaveContentItemDTO';

export class KyselyCreateContentItemNewsInteractorRepo
implements SaveContentItemRepo {
	async save(saveDTO: SaveContentItemDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await trx
				.insertInto('contentItem')
				.values({
					id: saveDTO.id,
					title: saveDTO.title,
					summary: saveDTO.summary,
					content: saveDTO.content,
					publishStatus: saveDTO.publishStatus,
					contentType: saveDTO.contentType,
					... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
				})
				.execute();

			const validUserRolesIds
				= saveDTO.roleId === undefined
					? (
						await db
							.selectFrom('role')
							.select('role.id as role')
							.execute()
					).map((r) => r.role)
					: saveDTO.roleId.filter(
						(id): id is string => id != null && id !== ''
					);

			if (validUserRolesIds.length > 0) {
				await trx
					.insertInto('contentItemRoleMap')
					.values(
						validUserRolesIds.map((id) => ({
							contentItemId: saveDTO.id,
							roleId: id
						}))
					)
					.execute();
			}
		});
	}
}