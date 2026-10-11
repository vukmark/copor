import {Kysely, sql} from 'kysely';

// Adds 'FILE' as a valid private_message.type value. The frontend's attachment flow
// (any image/document/unsupported file sent via the media picker) has always sent
// type: 'FILE' (vu_meet_message_repository_impl.dart), and MessageContentType.FILE has
// existed in the domain enum since it was added, but the original table migration never
// included 'FILE' in the DB enum - so every attachment send has been failing at the DB
// layer. 'PICTURE' is kept for existing rows/back-compat even though nothing writes it
// today. Going down, existing FILE rows are remapped to PICTURE (closest equivalent)
// rather than deleted, since these are real user chat messages, not disposable tokens.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('private_message')
		.modifyColumn('type', sql.raw("enum('TEXT','PICTURE','CALL_EVENT','FILE')"), (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db
		.updateTable('private_message' as never)
		.set({type: 'PICTURE'} as never)
		.where('type' as never, '=', 'FILE' as never)
		.execute();

	await db.schema
		.alterTable('private_message')
		.modifyColumn('type', sql.raw("enum('TEXT','PICTURE','CALL_EVENT')"), (col) => col.notNull())
		.execute();
}
