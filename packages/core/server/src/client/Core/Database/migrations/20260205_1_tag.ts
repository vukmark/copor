import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'tag');

	table.addId();
	table.addVarChar255('name');
	table.addTinyInt('color', 2);
	table.addText('description', true);
	table.addTinyInt('is_private');
	table.addVarChar('actor_id', 36);
	table.addEnum('color_set', ColorSet);

	table.addCreatedBy();
	table.addModifiedBy();
	table.addCreatedAt();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('tag').execute();
}