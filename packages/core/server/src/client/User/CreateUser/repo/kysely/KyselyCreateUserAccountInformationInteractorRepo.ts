import {CreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/CreateUserAccountInformationRepo';
import {SaveUserAccountInformationDTO} from '@copor/core/domain/User/AccountInformation/interactor/dto/SaveUserAccountInformationDTO';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {NewUsernameHelper} from '@copor/core/client/Core/Helpers/NewUsernameHelper';
import {PasswordHelper} from '@copor/core/client/Core/Helpers/PasswordHelper';
import {KyselyRoleHelper} from '@copor/core/client/Core/Helpers/KyselyRoleHelper';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateUserAccountInformationInteractorRepo implements CreateUserAccountInformationRepo {
	private readonly appContext: AppContext;

	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async save(saveDTO: SaveUserAccountInformationDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const role = await KyselyRoleHelper.getRoleByRoleType(saveDTO.roleType);
			const authUserId = await new IdGenerator().getNewId();
			const userName = await NewUsernameHelper.create(undefined, saveDTO.firstName, saveDTO.lastName);
			const hashedPassword = await PasswordHelper.hashPassword(saveDTO.password, this.appContext);
			const timestamps = TimestampHelper.getTimestampForCreate(saveDTO.actorId);

			await trx
				.insertInto('authUser')
				.values({
					id: authUserId,
					userName,
					password: hashedPassword,
					email: saveDTO.email ?? null,
					... timestamps
				})
				.execute();

			await PasswordHelper.recordPasswordChange(authUserId, hashedPassword, trx);

			let addressId: string | undefined;

			if (this.hasAddressData(saveDTO)) {
				addressId = await new IdGenerator().getNewId();
				await trx
					.insertInto('address')
					.values({
						id: addressId,
						streetAddress: saveDTO.addressStreet ?? null,
						postalCode: saveDTO.postalCode ?? null,
						city: saveDTO.city ?? null,
						country: saveDTO.country ?? null,
						state: saveDTO.state ?? null,
						... timestamps
					})
					.execute();
			}

			await trx
				.insertInto('user')
				.values({
					id: saveDTO.id,
					authUserId,
					roleId: role.id,
					firstName: saveDTO.firstName,
					lastName: saveDTO.lastName,
					nickname: saveDTO.nickname ?? null,
					salutation: saveDTO.salutation ?? null,
					citizenship: saveDTO.citizenship ?? null,
					gender: saveDTO.gender ?? null,
					nativeLanguage: saveDTO.nativeLanguage ?? null,
					placeOfBirth: saveDTO.placeOfBirth ?? null,
					qualifications: saveDTO.qualifications ?? null,
					addressId: addressId ?? null,
					isDefaultRole: 1,
					isActive: 1,
					... timestamps
				})
				.execute();
		});
	}

	private hasAddressData(saveDTO: SaveUserAccountInformationDTO): boolean {
		return Boolean(
			saveDTO.addressStreet ?? saveDTO.postalCode ?? saveDTO.city ?? saveDTO.country ?? saveDTO.state
		);
	}
}
