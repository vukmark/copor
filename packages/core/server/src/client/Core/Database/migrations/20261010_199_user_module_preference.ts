import {Kysely, sql} from 'kysely';

// Per-user on/off settings that modules declare (descriptor `preferences`,
// e.g. `vu_meet.messagePushNotifications`), replacing the module columns of
// `user_preferences`. The values users had for VuMeet's push toggle and
// Cloud's two folder toggles are kept; the other module columns were never
// read (cloud, bulletin, news, calendar push; private folders) and are dropped.
const KEPT_COLUMNS: [column: string, key: string][] = [
	['vu_meet', 'vu_meet.messagePushNotifications'],
	['group_folders', 'cloud.groupFolderNotifications'],
	['user_folders', 'cloud.userFolderNotifications']
];
const DROPPED_COLUMNS = ['cloud', 'bulletin', 'vu_meet', 'news', 'calendar', 'group_folders', 'user_folders', 'private_folders'];

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable('user_module_preference')
		.addColumn('user_id', 'varchar(36)', (col) => col.notNull().references('user.id').onDelete('cascade'))
		.addColumn('preference_key', 'varchar(100)', (col) => col.notNull())
		.addColumn('value', 'boolean', (col) => col.notNull())
		.addPrimaryKeyConstraint('user_module_preference_pk', ['user_id', 'preference_key'])
		.execute();

	for (const [column, key] of KEPT_COLUMNS) {
		await sql`
			INSERT INTO user_module_preference (user_id, preference_key, value)
			SELECT user_id, ${key}, ${sql.ref(column)} FROM user_preferences WHERE ${sql.ref(column)} IS NOT NULL
		`.execute(db);
	}

	const [first, ... rest] = DROPPED_COLUMNS;
	let dropColumns = db.schema.alterTable('user_preferences').dropColumn(first);

	for (const column of rest)
		dropColumns = dropColumns.dropColumn(column);
	await dropColumns.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	for (const column of DROPPED_COLUMNS)
		await db.schema.alterTable('user_preferences').addColumn(column, sql`tinyint(1)`).execute();

	for (const [column, key] of KEPT_COLUMNS) {
		await sql`
			UPDATE user_preferences p JOIN user_module_preference m
			ON m.user_id = p.user_id AND m.preference_key = ${key}
			SET p.${sql.ref(column)} = m.value
		`.execute(db);
	}

	await db.schema.dropTable('user_module_preference').execute();
}
