import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {FontSize} from '@copor/core/domain/Core/enum/dto/FontSize';
import {FontWeight} from '@copor/core/domain/Core/Enum/FontWeight';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';
import {ActionFeedbackDuration} from '@copor/core/domain/Core/enum/ActionFeedbackDuration';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_preferences');

	table.addTinyInt('use_icons');
	table.addTinyInt('picture', 1);
	table.addTinyInt('email', 1);
	table.addTinyInt('date_of_birth', 1);
	table.addTinyInt('tenant', 1);
	table.addTinyInt('group', 1);
	table.addTinyInt('private', 1);
	table.addTinyInt('face_id', 1);
	table.addTinyInt('fingerprint', 1);
	table.addTinyInt('lock_app_id', 1);
	table.addTinyInt('cloud', 1);
	table.addTinyInt('bulletin', 1);
	table.addTinyInt('vu_meet', 1);
	table.addTinyInt('news', 1);
	table.addTinyInt('calendar', 1);
	table.addTinyInt('group_folders', 1);
	table.addTinyInt('user_folders', 1);
	table.addTinyInt('private_folders', 1);

	table.addEnumString('theme_mode', ['0', '1', '2']);
	table.addEnumString('contrast', ['0', '1', '2', '3']);
	table.addEnum('font_size', FontSize);
	table.addEnum('font_weight', FontWeight);
	table.addEnum('color_set', ColorSet);
	table.addEnum('snack_bar_duration', ActionFeedbackDuration);

	table.addNullableForeignKey('language', 'language');
	table.addForeignKey('user_id', 'user');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_preferences').execute();
}