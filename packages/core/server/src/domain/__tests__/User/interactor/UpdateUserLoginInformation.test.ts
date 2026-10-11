import {UpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/UpdateUserLoginInformationRepo';
import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';
import {UpdateUserLoginInformation} from '@copor/core/domain/User/interactor/UpdateUserLoginInformation';


describe('update user login information interactor tests', () => {
	const mockRepo: jest.Mocked<UpdateUserLoginInformationRepo> = {
		save: jest.fn()
	};
	const input: UpdateUserLoginInformationDTO = {
		actorId: 'actorId',
		newPassword: 'newPass',
		oldPassword: 'oldPass',
		userId: 'uid'
	};

	it('should save the changes', async () => {
		const updateUserLoginInformation: UpdateUserLoginInformation = new UpdateUserLoginInformation(input, mockRepo);

		await updateUserLoginInformation.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
