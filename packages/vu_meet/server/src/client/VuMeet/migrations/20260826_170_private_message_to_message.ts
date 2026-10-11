import {Kysely} from 'kysely';

// Renames private_message -> message to match its sibling chat,
// following through on the class/folder-layer PrivateMessage -> Message
// rename (see docs/decisions.md). The name predates the unified chat
// model - it was originally paired with the now-deleted dyadic private_chat
// table - and wasn't renamed along with chat.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema.alterTable('private_message').renameTo('message').execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.alterTable('message').renameTo('private_message').execute();
}
