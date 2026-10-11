import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {Priority} from '@copor/core/domain/Core/enum/Priority';
import {Progress} from '@copor/core/domain/Core/enum/Progress';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'private_to_do');

	table.addId();
	table.addVarChar('actor_id', 36);
	table.addVarChar255('title');
	table.addEnum('priority', Priority);
	table.addDateTime('deadline', true);
	table.addDateTime('scheduled_time', true);
	table.addTinyInt('is_pinned');
	table.addTinyInt('is_displayed_in_calendar');
	table.addEnum('progress', Progress);

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('private_to_do').execute();
}