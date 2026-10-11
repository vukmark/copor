import {GetVuMeetFileDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileDTO';
import {GetVuMeetFile} from '@copor/vu_meet/domain/VuMeet/Message/interactor/GetVuMeetFile';
import {GetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetVuMeetFileRepo';
import {GetVuMeetFileInputDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetVuMeetFileInputDTO';

describe('Get VuMeetFile tests', () => {
	const mockRepo: jest.Mocked<GetVuMeetFileRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetVuMeetFileDTO = {
		fileName: '',
		file: Buffer.from('test buffer')
	};

	const vuMeetFileInput: GetVuMeetFileInputDTO = {
		actorId: 'actorId',
		messageId: 'messageId'
	};
	const getVuMeetFile: GetVuMeetFile = new GetVuMeetFile(vuMeetFileInput, mockRepo);

	it('Should return VuMeetFile based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getVuMeetFile.execute()).toEqual(expectedResponse);
	});
});