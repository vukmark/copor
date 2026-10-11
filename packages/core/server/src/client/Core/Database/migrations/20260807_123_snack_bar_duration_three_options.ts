import {Kysely, sql} from 'kysely';

// MySQL rejects an ALTER that narrows an enum's value set while existing rows
// still hold values outside the new set, so this widens to the union of old
// and new values first, remaps existing rows, then narrows to the final set.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user_preferences')
		.modifyColumn('snack_bar_duration', sql.raw("enum('PERSISTENT','NORMAL','OFF','FIVE_SECONDS','TWENTY_SECONDS')"), (col) => col.notNull())
		.execute();

	await db
		.updateTable('user_preferences' as never)
		.set({snack_bar_duration: 'OFF'} as never)
		.where('snack_bar_duration' as never, '=', 'PERSISTENT' as never)
		.execute();
	await db
		.updateTable('user_preferences' as never)
		.set({snack_bar_duration: 'FIVE_SECONDS'} as never)
		.where('snack_bar_duration' as never, '=', 'NORMAL' as never)
		.execute();

	await db.schema
		.alterTable('user_preferences')
		.modifyColumn('snack_bar_duration', sql.raw("enum('OFF','FIVE_SECONDS','TWENTY_SECONDS')"), (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user_preferences')
		.modifyColumn('snack_bar_duration', sql.raw("enum('PERSISTENT','NORMAL','OFF','FIVE_SECONDS','TWENTY_SECONDS')"), (col) => col.notNull())
		.execute();

	await db
		.updateTable('user_preferences' as never)
		.set({snack_bar_duration: 'PERSISTENT'} as never)
		.where('snack_bar_duration' as never, '=', 'OFF' as never)
		.execute();
	await db
		.updateTable('user_preferences' as never)
		.set({snack_bar_duration: 'NORMAL'} as never)
		.where('snack_bar_duration' as never, 'in', ['FIVE_SECONDS', 'TWENTY_SECONDS'] as never)
		.execute();

	await db.schema
		.alterTable('user_preferences')
		.modifyColumn('snack_bar_duration', sql.raw("enum('PERSISTENT','NORMAL')"), (col) => col.notNull())
		.execute();
}
