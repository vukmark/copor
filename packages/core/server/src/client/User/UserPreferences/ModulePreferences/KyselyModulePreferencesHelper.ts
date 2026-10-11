import {sql} from 'kysely';
import {db} from '@copor/core/client/AppDataSource';
import {
	findModulePreferenceDefinition,
	resolveModulePreferences
} from '@copor/core/domain/User/UserPreferences/ModulePreferences/ModulePreferenceRegistry';

// Reads and writes the module preferences (`user_module_preference`). Only the
// values a user changed are stored; everything else is the definition's default.
export class KyselyModulePreferencesHelper {
	// Every registered preference for the user.
	public static async load(userId: string): Promise<Record<string, boolean>> {
		const rows = await db.selectFrom('userModulePreference')
			.select(['preferenceKey', 'value'])
			.where('userId', '=', userId)
			.execute();

		return resolveModulePreferences(Object.fromEntries(rows.map((row) => [row.preferenceKey, Boolean(row.value)])));
	}

	public static async save(userId: string, preferences: Record<string, boolean>, database = db): Promise<void> {
		const rows = Object.entries(preferences).map(([preferenceKey, value]) => ({userId, preferenceKey, value}));

		if (rows.length === 0)
			return;

		await database.insertInto('userModulePreference')
			.values(rows)
			.onDuplicateKeyUpdate({value: sql<boolean>`VALUES(\`value\`)`})
			.execute();
	}

	// The users among `userIds` for whom the preference is off — e.g. who must
	// not get a module's push.
	public static async usersWithPreferenceOff(key: string, userIds: string[]): Promise<string[]> {
		const definition = findModulePreferenceDefinition(key);

		if (!definition)
			throw new Error(`Unknown module preference "${key}"`);
		if (userIds.length === 0)
			return [];

		const rows = await db.selectFrom('userModulePreference')
			.select(['userId', 'value'])
			.where('preferenceKey', '=', key)
			.where('userId', 'in', userIds)
			.execute();
		const stored = new Map(rows.map((row) => [row.userId, Boolean(row.value)]));

		return userIds.filter((userId) => !(stored.get(userId) ?? definition.default));
	}
}
