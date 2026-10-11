import {GetUserAccountInformationForDisplayRepo}
	from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationForDisplayRepo';
import {GetUserAccountInformationForDisplayDTO}
	from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class KyselyGetUserAccountInformationForDisplayInteractorRepo
implements GetUserAccountInformationForDisplayRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async load(userId: string): Promise<GetUserAccountInformationForDisplayDTO> {
		const user = await db
			.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.innerJoin('authUser', 'authUser.id', 'user.authUserId')
			.leftJoin('image', 'user.profileImageId', 'image.id')
			.select([
				'role.type as roleType',
				'authUser.email as email',
				'authUser.userName as username',
				'user.firstName as firstName',
				'user.lastName as lastName',
				'user.salutation as salutation',
				'user.nickname as nickname',
				'user.addressId as addressId',
				'user.citizenship as citizenship',
				'image.name as imageName',
				'image.extension as imageExtension',
				'user.createdAt as registrationDate',
				'user.lastVisitedAt as lastVisitedAt'
			])
			.where('user.id', '=', userId)
			.executeTakeFirst();

		if (!user)
			throw new Error('User has no role');

		const addressData = user.addressId ? await db
			.selectFrom('address')
			.leftJoin('country', 'country.id', 'address.country')
			.leftJoin('state', 'state.id', 'address.state')
			.select([
				'address.id as addressId',
				'address.streetAddress as streetAddress',
				'address.postalCode as postalCode',
				'address.city as city',
				'country.id as countryId',
				'country.name as countryName',
				'country.code as countryCode',
				'state.id as stateId',
				'state.name as stateName',
				'state.code as stateCode'
			])
			.where('address.id', '=', user.addressId)
			.executeTakeFirst() : undefined;

		return {
			firstName: user.firstName ?? '',
			lastName: user.lastName ?? '',
			pictureName: user.imageName ?? undefined,
			pictureExtension: user.imageExtension ?? undefined,
			userName: user.username,
			id: userId,
			lastVisitedDate: user.lastVisitedAt ?? undefined,
			address: addressData && addressData.countryId && addressData.stateId ? {
				addressId: addressData.addressId,
				streetAddress: addressData.streetAddress ?? undefined,
				postalCode: addressData.postalCode ?? undefined,
				city: addressData.city ?? undefined,
				country: {
					id: addressData.countryId,
					name: addressData.countryName ?? '',
					publishStatus: PublishStatus.published,
					code: addressData.countryCode ?? ''
				},
				state: {
					id: addressData.stateId,
					name: addressData.stateName ?? '',
					code: addressData.stateCode ?? '',
					countryId: addressData.countryId,
					publishStatus: PublishStatus.published
				}
			} : undefined,
			registrationDate: user.registrationDate,
			citizenship: user.citizenship ?? undefined,
			salutation: user.salutation ?? undefined,
			nickname: user.nickname ?? undefined,
			email: user.email!,
			roleType: user.roleType
		};
	}
}
