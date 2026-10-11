import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {RegisterRepo} from '@copor/core/domain/Registration/repository/RegisterRepo';
import {SaveRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/SaveRegistrationDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {KyselyRoleHelper} from '@copor/core/client/Core/Helpers/KyselyRoleHelper';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {DefaultUserPreferencesHelper} from '@copor/core/client/User/UserPreferences/Helper/DefaultUserPreferencesHelper';
import {
	KyselyUpdateUserPreferencesInteractorRepo
} from '@copor/core/client/User/UserPreferences/UpdateUserPreferences/repo/kysely/KyselyUpdateUserPreferencesInteractorRepo';
import {RegistrationVerificationHelper} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';

// Self-registered accounts: role USER, no tenant, inactive until the emailed code is verified.
export class KyselyRegisterRepo implements RegisterRepo {
	private readonly appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	public async save(input: SaveRegistrationDTO): Promise<void> {
		const role = await KyselyRoleHelper.getRoleByRoleType(RoleType.USER);
		const authUserId = await new IdGenerator().getNewId();
		const hashedPassword = await PasswordHelper.hashPassword(input.password, this.appContext);
		const timestamps = TimestampHelper.getTimestampForCreate(input.userId);

		await db.transaction().execute(async (trx) => {
			await trx.insertInto('authUser')
				.values({
					id: authUserId,
					userName: input.userName,
					email: input.email,
					password: hashedPassword,
					... timestamps
				})
				.execute();

			await PasswordHelper.recordPasswordChange(authUserId, hashedPassword, trx);

			await trx.insertInto('user')
				.values({
					id: input.userId,
					authUserId,
					roleId: role.id,
					tenantId: null,
					firstName: input.firstName.trim(),
					lastName: input.lastName.trim(),
					isDefaultRole: 1,
					isActive: 0,
					... timestamps
				})
				.execute();

			await new KyselyUpdateUserPreferencesInteractorRepo()
				.useTransaction(trx)
				.save(DefaultUserPreferencesHelper.build(input.userId));

			await RegistrationVerificationHelper.issueCode(
				authUserId,
				input.verificationCode,
				input.codeExpiresAt,
				this.appContext,
				trx
			);
		});

		await RegistrationVerificationHelper.sendCode(input.email, input.firstName.trim(), input.verificationCode);
	}
}
