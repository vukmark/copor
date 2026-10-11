import {GetUserContactInformationRepo}
	from '@copor/contacts/domain/Contacts/GetUserContactInformation/repository/GetUserContactInformationRepo';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {GetUserContactInformationDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetUserContactInformationDTO';

export class FakeGetUserContactInformationInteractorRepo implements GetUserContactInformationRepo {
	load(userId: string): Promise<GetUserContactInformationDTO> {
		return Promise.resolve({
			userId: 'uid',
			email: 'string',
			username: 'string',
			roleName: 'string',
			roleType: RoleType.USER,
			firstName: 'string',
			lastName: 'string'
		});
	}
}
