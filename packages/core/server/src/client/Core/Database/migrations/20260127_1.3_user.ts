import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user');

	table.addId();

	table.addTinyIntWithDefault('is_active', 0);
	table.addTinyIntWithDefault('is_default_role', 0);

	table.addNullableForeignKey('profile_image_id', 'image');
	table.addNullableForeignKey('auth_user_id', 'auth_user');
	table.addNullableForeignKey('role_id', 'role');

	table.addVarChar255('first_name', true);
	table.addVarChar255('last_name', true);
	table.addVarChar255('nickname', true);
	table.addVarChar255('salutation', true);
	table.addVarChar255('qualifications', true);
	table.addVarChar255('place_of_birth', true);
	table.addEnumString('gender', ['MALE', 'FEMALE', 'OTHER'], true);
	table.addNullableForeignKey('citizenship', 'country');
	table.addNullableForeignKey('native_language', 'language');
	table.addNullableForeignKey('address_id', 'address');
	table.addText('contact_note', true);

	table.addCreatedBy();
	table.addModifiedBy();
	table.addCreatedAt();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user').execute();
}
