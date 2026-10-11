import {GetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/GetContactInfoForUserRepo';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class FakeGetContactListInteractorRepo implements GetContactInfoForUserRepo {
	public load(userId: string): Promise<GetContactInfoForUserDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'contact-1',
					firstName: 'Emma',
					lastName: 'Johnson',
					email: 'emma.johnson@example.com',
					salutation: 'Ms.',
					picture: 'https://example.com/emma.jpg',
					address: '100 Park Avenue',
					country: 'United States',
					state: 'New York',
					postalCode: '10016',
					city: 'New York',
					phoneNumber: [
						{
							phoneTitle: 'Mobile',
							phoneNumber: '+1 212-555-1234'
						},
						{
							phoneTitle: 'Work',
							phoneNumber: '+1 212-555-5678'
						}
					],
					tenantAddress: '200 University Place',
					tenantCountry: 'United States',
					tenantState: 'New York',
					tenantPostalCode: '10003',
					tenantCity: 'New York',
					role: RoleType.ADMIN,
					isActive: true
				});
		});
	}
}