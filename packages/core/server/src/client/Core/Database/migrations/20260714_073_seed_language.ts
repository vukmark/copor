import {Kysely} from 'kysely';
const languages: {id: string; name: string; code: string; nativeName: string}[] = [
	{id: '299ef4b8-a876-4861-87f8-c2c0ee5a931d', name: 'German', code: 'GE', nativeName: 'Deutsch'},
	{id: '6d911e2c-2c2a-11f0-9013-db3060506f3f', name: 'English', code: 'EN', nativeName: 'English'}
];

export async function up(db: Kysely<unknown>): Promise<void> {
	await db
		.insertInto('language' as never)
		.values(
			languages.map((language) => ({
				id: language.id,
				name: language.name,
				code: language.code,
				native_name: language.nativeName,
				publish_status: 'PUBLISHED',
				created_by: null,
				modified_by: null
			})) as never
		)
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db
		.deleteFrom('language' as never)
		.where('id' as never, 'in', languages.map((language) => language.id) as never)
		.execute();
}
