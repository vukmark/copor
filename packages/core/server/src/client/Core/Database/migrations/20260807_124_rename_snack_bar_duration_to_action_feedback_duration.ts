import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user_preferences')
		.renameColumn('snack_bar_duration', 'action_feedback_duration')
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user_preferences')
		.renameColumn('action_feedback_duration', 'snack_bar_duration')
		.execute();
}
