import {GetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/GetContactInfoForUserRepo';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';
import {db} from '@copor/core/client/AppDataSource';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {AddressKyselyHelper} from '@copor/core/client/Components/Address/helper/AddressKyselyHelper';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {PhoneNumberKyselyHelper} from '@copor/core/client/Global/PhoneNumber/repositoryHelper/PhoneNumberKyselyHelper';
import {ImageHelper} from '@copor/core/client/Core/Helpers/ImageHelper';

export class KyselyGetContactInfoForUserInteractorRepo implements GetContactInfoForUserRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}
	public async load(userId: string): Promise<GetContactInfoForUserDTO> {
		const user = await db
			.selectFrom('user')
			.select(['id', 'authUserId', 'isActive', 'salutation'])
			.where('id', '=', userId)
			.executeTakeFirst();

		if (!user) {
			throw new Error('User not found');
		}

		const userSimpleData = await UserKyselyHelper.getUserData(user.id, this.appContext);
		const userEmail = await UserKyselyHelper.getUserEmail(user.id);
		const userAddress = await AddressKyselyHelper.getUserAddress(user.id);
		const userTenantData = await AddressKyselyHelper.getTenantAddressDataForUser(user.id);
		const userPhoneNumber = await PhoneNumberKyselyHelper.getUserPhoneNumbers(user.id);
		const userProfilePicture = ImageHelper
			.getProfileImageUrlOrEmptyString(userSimpleData.imageName ?? '', userSimpleData.imageExtension ?? '', this.appContext);

		return {
			id: user.id,
			firstName: userSimpleData.userFirstName!,
			lastName: userSimpleData.userLastName!,
			email: userEmail!,
			salutation: user.salutation ?? undefined,
			picture: userProfilePicture,
			address: userAddress?.streetAddress ?? undefined,
			postalCode: userAddress?.postalCode ?? undefined,
			state: userAddress?.state ?? undefined,
			city: userAddress?.city ?? undefined,
			country: userAddress?.country ?? undefined,
			tenantName: userTenantData?.tenantName ?? undefined,
			tenantAddress: userTenantData?.streetAddress ?? undefined,
			tenantCity: userTenantData?.city ?? undefined,
			tenantCountry: userTenantData?.country ?? undefined,
			tenantState: userTenantData?.state ?? undefined,
			tenantPostalCode: userTenantData?.postalCode ?? undefined,
			role: userSimpleData.userRoleType!,
			phoneNumber: userPhoneNumber ?? undefined,
			isActive: Boolean(user.isActive)
		} satisfies GetContactInfoForUserDTO;
	}
}
