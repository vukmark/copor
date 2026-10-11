import {db} from '@copor/core/client/AppDataSource';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {AppContext} from '@copor/core/client/Interface/AppContext';

export class UserKyselyHelper {
	static async isNotValidUser(userId: string | undefined): Promise<boolean> {
		if (!userId)
			return true;
		const user = await db
			.selectFrom('user')
			.select(['id'])
			.where('id', '=', userId)
			.executeTakeFirst();

		return !user;
	}

	public static async getUserData(userId: string, appContext: AppContext) {
		const user = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.leftJoin('image', 'user.profileImageId', 'image.id')
			.select([
				'user.firstName as userFirstName',
				'user.lastName as userLastName',
				'image.name as imageName',
				'image.extension as imageExtension',
				'authUser.userName as username',
				'role.name as roleName',
				'role.type as userRoleType'
			])
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (!user)
			return {
				userId: userId,
				userFirstName: undefined,
				userLastName: undefined,
				imageName: undefined,
				imageExtension: undefined,
				username: undefined,
				userRoleType: undefined
			};

		return {userId, ... user};
	}

	public static async getUserEmail(authUserId: string) {
		const row = await db
			.selectFrom('authUser')
			.select(['email'])
			.where('id', '=', authUserId)
			.executeTakeFirst();

		return row?.email ?? null;
	}

	public static async findUser(userId: string) {
		const result = await db
			.selectFrom('user')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.select([
				'user.firstName as userFirstName',
				'user.lastName as userLastName',
				'authUser.userName as username'
			])
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (result) {
			return result;
		}
		throw new Error(`User data not found for userId: ${userId}`);
	}

	public static async findUserNameSafe(userId: string) {
		try {
			return await UserKyselyHelper.findUser(userId);
		} catch {
			return undefined;
		}
	}

	public static async isNotValidAuthUser(id: string | undefined): Promise<boolean> {
		if (!id)
			return true;
		const user = await db
			.selectFrom('authUser')
			.select(['id'])
			.where('id', '=', id)
			.executeTakeFirst();

		return !user;
	}

	public static async isNotSignedTermsAndConditions(userId: string | undefined): Promise<boolean> {
		if (!userId)
			return true;


		const termsContract = await db
			.selectFrom('contract')
			.select('id')
			.where('type', '=', ContractType.TERMS_AND_CONDITIONS)
			.executeTakeFirst();

		if (!termsContract) {
			throw new Error('No terms and conditions contract in database');
		}

		const userContract = await db
			.selectFrom('userContractMap')
			.select('contractId')
			.where('userId', '=', userId)
			.where('contractId', '=', termsContract.id)
			.executeTakeFirst();

		return !userContract;
	}
}
