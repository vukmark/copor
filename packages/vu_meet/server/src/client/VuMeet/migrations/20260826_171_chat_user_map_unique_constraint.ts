import {Kysely} from 'kysely';

// chat_user_map had no uniqueness guarantee on (chat_id, user_id) -
// nothing at the DB or application layer stopped the same user being
// inserted twice into the same chat's membership (docs/modules/VuMeet.md
// §1.5). Dedupes any existing duplicate rows first (defensive - none exist
// in dev today, but this migration must not fail if it ever runs against a
// dataset that already has them), then adds the constraint.
export async function up(db: Kysely<unknown>): Promise<void> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const anyDb = db as unknown as Kysely<any>;

	const distinctMemberships: {chat_id: string; user_id: string}[] = await anyDb
		.selectFrom('chat_user_map')
		.select(['chat_id', 'user_id'])
		.distinct()
		.execute();

	await anyDb.deleteFrom('chat_user_map').execute();

	if (distinctMemberships.length > 0) {
		await anyDb.insertInto('chat_user_map').values(distinctMemberships).execute();
	}

	await db.schema
		.alterTable('chat_user_map')
		.addUniqueConstraint('chat_user_map_chat_id_user_id_unique', ['chat_id', 'user_id'])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('chat_user_map')
		.dropConstraint('chat_user_map_chat_id_user_id_unique')
		.execute();
}
