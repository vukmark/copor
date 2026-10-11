import {UpdateUserAccountInformationRepo} from '@copor/core/domain/User/repository/UpdateUserAccountInformationRepo';
import {UpdateUserAccountInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserAccountInformationDTO';
import {UpdateUserAccountInformation} from '@copor/core/domain/User/interactor/UpdateUserAccountInformation';

describe('update User Account Information interactor test', () => {
	const mockRepo: jest.Mocked<UpdateUserAccountInformationRepo> = {
		save: jest.fn()
	};

	const input: UpdateUserAccountInformationDTO = {
		id: 'id',
		firstName: 'firstName',
		lastName: 'lastName',
		actorId: 'actorId',
		addressId: 'addressId',
		addressStreet: 'addressStreet',
		citizenship: 'citizenship',
		city: 'city',
		country: 'country',
		email: 'email',
		nickname: 'nickName',
		phoneNumberList: [],
		picture: 'picture',
		postalCode: 'postalCode',
		salutation: 'salutation',
		state: 'state'
	};

	it('should save the changes', async () => {
		const updateUserAccountInformation: UpdateUserAccountInformation
            = new UpdateUserAccountInformation(input, mockRepo);

		await updateUserAccountInformation.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});