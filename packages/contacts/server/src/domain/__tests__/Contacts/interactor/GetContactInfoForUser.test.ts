import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';
import {GetContactInfoForUser} from '@copor/contacts/domain/Contacts/interactor/GetContactInfoForUser';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

describe('get Contact by ID', () => {
	const mockRepo: jest.Mocked<GetItem<GetContactInfoForUserDTO>> = {
		load: jest.fn()
	};
	const interactor = new GetContactInfoForUser('unique-id', mockRepo);

	it('should return user with provided id', async () => {
		const expectedResponse: GetContactInfoForUserDTO = {
			id: 'id',
			firstName: 'firstName',
			lastName: 'lastName',
			email: 'email',
			role: RoleType.USER
		};

		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});