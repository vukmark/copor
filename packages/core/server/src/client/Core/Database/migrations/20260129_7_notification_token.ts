import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'notification_token');

	table.addId();
	table.addVarChar255('token');
	table.addEnum('type', NotificationTokenType);

	table.addNullableForeignKey('user_id', 'user');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('notification_token').execute();
}