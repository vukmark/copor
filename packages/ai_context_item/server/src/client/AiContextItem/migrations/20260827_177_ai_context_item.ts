import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'ai_context_item');

	table.addId();
	table.addVarChar255('question_de');
	table.addVarChar255('question_en');

	table.addLongText('answer_de');
	table.addLongText('answer_en');

	table.addCreatedBy();
	table.addCreatedAt();
	table.addModifiedBy();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('ai_context_item').execute();
}