import {ValidateCreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/ValidateCreateUserAccountInformationRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCreateUserAccountInformationValidatorStorageRepo implements ValidateCreateUserAccountInformationRepo {
	async isEmailAlreadyInUse(email: string): Promise<boolean> {
		const existing = await db
			.selectFrom('authUser')
			.select('id')
			.where('email', '=', email)
			.executeTakeFirst();

		return Boolean(existing);
	}
}
