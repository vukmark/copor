import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetVuMeetUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetVuMeetUserDTO';
import {GetVuMeetUser} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetVuMeetUser';

describe('Get text user', () => {
	const mockRepo: jest.Mocked<GetItem<GetVuMeetUserDTO>> = {
		load: jest.fn()
	};

	const interactor = new GetVuMeetUser('unique-id', mockRepo);

	it('should return vuMeet user with provided id', async () => {
		const expectedResponse: GetVuMeetUserDTO = {
			firstName: 'firstName',
			imageExtension: 'imageExtension',
			imageName: 'imageName',
			lastName: 'lastName'
		};

		mockRepo.load.mockResolvedValue(expectedResponse);
		expect(await interactor.execute()).toEqual(expectedResponse);
	});
});