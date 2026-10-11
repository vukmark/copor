import {GetUserAccountInformationForDisplayRepo}
	from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationForDisplayRepo';
import {GetUserAccountInformationForDisplayDTO}
	from '@copor/core/domain/User/AccountInformation/interactor/dto/GetUserAccountInformationForDisplayDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetUserAccountInformatForDisplayionInteractorRepo implements GetUserAccountInformationForDisplayRepo {
	load(id: string): Promise<GetUserAccountInformationForDisplayDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'uid',
					firstName: 'Max',
					lastName: 'Mustermann',
					userName: 'max.mustermann',
					registrationDate: new Date(),
					lastVisitedDate: new Date(),
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
					roleType: RoleType.USER
				}
			);
		});
	}
}
