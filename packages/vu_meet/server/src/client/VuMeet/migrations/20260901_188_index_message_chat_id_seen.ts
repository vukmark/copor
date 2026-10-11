import {Kysely} from 'kysely';

// KyselyMarkChatMessagesSeenInteractorRepo.markChatMessagesRead runs on every
// "mark chat read" call, filtering message by (chat_id, seen) — chat_id
// alone is already indexed (FK auto-index), but MySQL still has to scan every
// row for the chat and filter seen separately without this composite index.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createIndex('idx_message_chat_id_seen')
		.on('message')
		.columns(['chat_id', 'seen'])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('idx_message_chat_id_seen').on('message').execute();
}
