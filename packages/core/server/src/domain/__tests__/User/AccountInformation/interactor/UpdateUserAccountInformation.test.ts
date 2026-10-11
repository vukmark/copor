import {GetUserAccountInformation} from '@copor/core/domain/User/AccountInformation/interactor/GetUserAccountInformation';
import {GetUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/GetUserAccountInformationRepo';


describe('update user account information interactor tests', () => {
	const mockRepo: jest.Mocked<GetUserAccountInformationRepo> = {
		load: jest.fn()
	};

	it('should save the changes', async () => {
		const updateUserAccountInformation: GetUserAccountInformation = new GetUserAccountInformation('unique-id', mockRepo);

		await updateUserAccountInformation.execute();
		expect(mockRepo.load).toHaveBeenCalledWith('unique-id');
	});
});
