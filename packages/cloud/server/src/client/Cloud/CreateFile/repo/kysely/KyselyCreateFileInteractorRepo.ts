import {SaveFileDTO, SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';
import {db} from '@copor/core/client/AppDataSource';
import {FindUserGroupFileDTO, SaveFileRepo} from '@copor/cloud/domain/Cloud/repository/SaveFileRepo';

export class KyselyCreateFileInteractorRepo implements SaveFileRepo {
	async findUserGroupFileId(input: FindUserGroupFileDTO): Promise<string | undefined> {
		const file = await db.selectFrom('cloudFile as file')
			.innerJoin('fileUserGroupMap as map', 'map.fileId', 'file.id')
			.select('file.id')
			.where('file.sharingType', '=', SharingType.USER_GROUP)
			.where('map.userGroupId', '=', input.userGroupId)
			.where('file.name', '=', input.name)
			.where('file.path', '=', input.path)
			.executeTakeFirst();

		return file?.id;
	}

	async save(saveDTO: SaveFileDTO): Promise<void> {
		switch (saveDTO.sharingType) {
			case SharingType.USER_GROUP :
				await db.transaction().execute(async (trx) => {
					if (saveDTO.overwrite) {
						await trx.updateTable('cloudFile')
							.set({
								size: saveDTO.buffer.length,
								description: saveDTO.description,
								createdBy: saveDTO.actorId,
								createdAt: new Date()
							})
							.where('id', '=', saveDTO.id)
							.executeTakeFirstOrThrow();
						return;
					}

					await trx.insertInto('cloudFile')
						.values({
							id: saveDTO.id,
							createdBy: saveDTO.actorId,
							sharingType: saveDTO.sharingType,
							name: saveDTO.name,
							description: saveDTO.description,
							path: saveDTO.path,
							size: saveDTO.buffer.length,
							createdAt: new Date()
						})
						.execute();
					await trx.insertInto('fileUserGroupMap')
						.values({
							userGroupId: saveDTO.sharingParticipants.userGroupId!,
							fileId: saveDTO.id
						}).execute();
				});
				break;
			case SharingType.PRIVATE :
				await db.transaction().execute(async (trx) => {
					await trx.insertInto('cloudFile')
						.values({
							id: saveDTO.id,
							createdBy: saveDTO.actorId,
							sharingType: saveDTO.sharingType,
							name: saveDTO.name,
							description: saveDTO.description,
							path: saveDTO.path,
							size: saveDTO.buffer.length,
							createdAt: new Date()
						})
						.execute();
				});
				break;
			case SharingType.PUBLIC :
				await db.transaction().execute(async (trx) => {
					await trx.insertInto('cloudFile')
						.values({
							id: saveDTO.id,
							createdBy: saveDTO.actorId,
							sharingType: saveDTO.sharingType,
							name: saveDTO.name,
							description: saveDTO.description,
							path: saveDTO.path,
							size: saveDTO.buffer.length,
							createdAt: new Date()
						})
						.execute();

					await trx.insertInto('fileUserMap')
						.values({
							fileId: saveDTO.id,
							userId: saveDTO.sharingParticipants.userId!
						}).execute();
				});
				break;
		}
	}
}
