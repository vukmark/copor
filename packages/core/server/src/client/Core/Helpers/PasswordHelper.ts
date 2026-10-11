import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {db} from '../../AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class PasswordHelper {
	public static hashPassword(password: string, appContext: AppContext): Promise<string> {
		const saltRounds = Number(appContext.envVariables!.PASSWORD_HASHING_SALT_ROUNDS);

		return bcrypt.hash(password, saltRounds);
	}

	public static async comparePassword(password: string, hash: string, authUserId: string, appContext: AppContext): Promise<boolean> {
		const saltRounds = Number(appContext.envVariables!.PASSWORD_HASHING_SALT_ROUNDS);

		if (hash.startsWith('$2b$') || hash.startsWith('$2a$') || hash.startsWith('$2x$') || hash.startsWith('$2y$')) {
			const normalizedHash = hash.replace(/^\$2[axy]\$/, '$2b$');
			const isMatch = await bcrypt.compare(password, normalizedHash);

			if (isMatch && !hash.startsWith('$2b$')) {
				const newHash = await bcrypt.hash(password, saltRounds);

				await PasswordHelper.updateUserPasswordInDatabase(authUserId, newHash);
			}
			return isMatch;
		}
		const md5Hash = crypto.createHash('md5').update(password).digest('hex');

		if (md5Hash === hash) {
			const newHash = await bcrypt.hash(password, saltRounds);

			await PasswordHelper.updateUserPasswordInDatabase(authUserId, newHash);
			return true;
		}
		return false;
	}

	public static matchesHash(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}

	public static async recordPasswordChange(
		authUserId: string,
		newPasswordHash: string,
		dbInstance: typeof db = db
	): Promise<void> {
		await dbInstance
			.insertInto('passwordHistory')
			.values({
				id: crypto.randomUUID(),
				authUserId,
				passwordHash: newPasswordHash
			})
			.execute();
	}

	private static async updateUserPasswordInDatabase(authUserId: string, newHash: string): Promise<void> {
		await db
			.updateTable('authUser')
			.set({password: newHash})
			.where('id', '=', authUserId)
			.execute();
	}
}
