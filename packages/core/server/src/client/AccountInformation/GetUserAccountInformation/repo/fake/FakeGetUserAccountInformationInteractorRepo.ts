import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';
import {GetUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/GetUserAccountInformationDTO';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export class FakeGetUserAccountInformationInteractorRepo implements GetUserAccountInformationRepo {
	load(id: string): Promise<GetUserAccountInformationDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'uid',
					firstName: 'Max',
					lastName: 'Mustermann',
					phoneNumberList: [
						{
							phoneNumber: '+38765656',
							phoneNumberType: PhoneNumberType.PHONE_MOBILE,
							id: 'phone-id',
							user: 'user-id'
						}
					],
					userName: 'max.mustermann',
					address: {
						addressId: 'someId',
						streetAddress: 'Musterstraße 22',
						postalCode: '99022',
						city: 'Augsburg',
						country: {
							id: 'cid',
							name: 'Germany',
							code: 'DE',
							publishStatus: PublishStatus.published
						},
						state: {
							id: 'sid',
							name: 'Bayern',
							code: 'BY',
							countryId: 'cid',
							publishStatus: PublishStatus.published
						}
					},
					citizenship: 'German',
					email: 'max.muster@mail.com',
					roleType: RoleType.USER,
					deletionRequested: false
				}
			);
		});
	}
}
