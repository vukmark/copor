import {Kysely, sql} from 'kysely';

// Adds 'ios_voip' as a valid notification_token.type value. Regular iOS APNs tokens
// (delivered through FCM) can't reliably wake CallKit when the app is backgrounded or
// killed - only a genuine PushKit VoIP token, sent through a direct APNs connection,
// is allowed by Apple to do that. This is purely additive to the existing enum set,
// so no data remap is needed going up; going down, any rows already using it are
// deleted rather than remapped, since there's no equivalent existing type for a VoIP
// token to fall back to.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('notification_token')
		.modifyColumn('type', sql.raw("enum('android','ios','web','ios_voip')"), (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db
		.deleteFrom('notification_token' as never)
		.where('type' as never, '=', 'ios_voip' as never)
		.execute();

	await db.schema
		.alterTable('notification_token')
		.modifyColumn('type', sql.raw("enum('android','ios','web')"), (col) => col.notNull())
		.execute();
}
