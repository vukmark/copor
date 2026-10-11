import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {OutboxEmailStatus} from '@copor/core/domain/Core/enum/OutboxEmailStatus';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'email_outbox');

	table.addId();
	table.addVarChar255('type');
	table.addVarChar255('receiver');
	table.addVarChar255('subject');
	table.addLongText('payload');
	table.addEnum('status', OutboxEmailStatus);
	table.addInt('attempts', 11, true);
	table.addDateTime('next_attempt_at', true);
	table.addLongText('last_error', true);
	table.addTimeStamp('created_at');
	table.addDateTime('sent_at', true);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('email_outbox').execute();
}
