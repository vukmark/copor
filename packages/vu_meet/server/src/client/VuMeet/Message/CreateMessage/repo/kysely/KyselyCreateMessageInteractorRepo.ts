import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {SaveMessageDTO}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {db} from '@copor/core/client/AppDataSource';
import {sql} from 'kysely';

export class KyselyCreateMessageInteractorRepo implements SaveItem<SaveMessageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	async save(saveDTO: SaveMessageDTO): Promise<void> {
		const timestampFields = TimestampHelper.getTimestampForCreate(saveDTO.sender);

		const query = sql`
            UPDATE chat
            SET last_message = ${saveDTO.content},
	            last_message_type = ${saveDTO.type},
	            last_message_sent_by = ${saveDTO.sender}
            WHERE id = ${saveDTO.chat}
		`;

		await query.execute(db);

		await db.insertInto('message').values({
			id: saveDTO.id,
			senderId: saveDTO.sender,
			chatId: saveDTO.chat,
			content: saveDTO.content.trim(),
			seen: false,
			extension: saveDTO.extension,
			type: saveDTO.type,
			... timestampFields
		}).execute();
	}
}
