/* eslint-disable @typescript-eslint/naming-convention */
import {Kysely} from 'kysely';

// chat only ever cached the last message's raw content, never its type - so a
// file/picture message's "last message" preview (chat list, push/WS notification) showed
// the literal filename instead of a generic "Sent a file"/"Sent a picture" label. Backfills
// existing rows to TEXT since we can't recover the real type retroactively; only affects the
// preview text until the next message updates it.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('chat')
		.addColumn('last_message_type', 'varchar(255)', (col) => col.notNull().defaultTo('TEXT'))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('chat')
		.dropColumn('last_message_type')
		.execute();
}
