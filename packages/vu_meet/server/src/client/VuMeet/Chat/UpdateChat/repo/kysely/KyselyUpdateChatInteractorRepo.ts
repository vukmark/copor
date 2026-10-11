import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {db} from '@copor/core/client/AppDataSource';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';
import {DuplicateChatMemberException} from '@copor/vu_meet/domain/VuMeet/Core/exception/DuplicateChatMemberException';
import {isDuplicateEntryError} from '@copor/core/client/Core/Database/isDuplicateEntryError';

export class KyselyUpdateChatInteractorRepo implements SaveItem<SaveChatDTO> {
	async save(saveDTO: SaveChatDTO): Promise<void> {
		saveDTO.userList.push(saveDTO.actorId);
		await db.transaction().execute(async (trx) => {
			await trx
				.updateTable('chat')
				.set({
					name: saveDTO.name,
					isPrivate: saveDTO.userList.length < 3
				})
				.where('id', '=', saveDTO.id)
				.execute();

			await trx
				.deleteFrom('chatUserMap')
				.where('chatId', '=', saveDTO.id)
				.execute();

			if (saveDTO.userList.length > 0) {
				try {
					await trx
						.insertInto('chatUserMap')
						.values(
							saveDTO.userList.map((userId) => ({
								chatId: saveDTO.id,
								userId
							}))
						)
						.execute();
				} catch (error) {
					if (isDuplicateEntryError(error))
						throw new DuplicateChatMemberException();
					throw error;
				}
			}
		});
	}
}