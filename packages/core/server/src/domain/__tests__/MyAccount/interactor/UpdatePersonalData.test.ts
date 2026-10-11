import {SavePersonalDataRepo} from '@copor/core/domain/MyAccount/repository/SavePersonalDataRepo';
import {SavePersonalDataDTO} from '@copor/core/domain/MyAccount/interactor/dto/SavePersonalDataDTO';
import {UpdatePersonalData} from '@copor/core/domain/MyAccount/interactor/UpdatePersonalData';
import {Gender} from '@copor/core/domain/Core/enum/Gender';

describe('update personal data tests', () => {
	let mockRepo: jest.Mocked<SavePersonalDataRepo>;
	let inputDTO: SavePersonalDataDTO;
	let updatePersonalData: UpdatePersonalData;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn(),
			getNewId: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			firstName: 'firstName',
			lastName: 'lastName',
			password: 'password',
			actorId: 'actor-id',
			userRole: 'role-id',
			placeOfBirth: 'placeOfBirth',
			gender: Gender.FEMALE,
			nativeLanguage: 'Deutsch'
		};
		updatePersonalData = new UpdatePersonalData(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updatePersonalData.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
