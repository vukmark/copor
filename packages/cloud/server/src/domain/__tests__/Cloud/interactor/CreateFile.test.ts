import {CreateFile} from '@copor/cloud/domain/Cloud/interactor/CreateFile';
import {SaveFileRepo} from '@copor/cloud/domain/Cloud/repository/SaveFileRepo';
import {SaveFileDTO, SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

describe('Create File tests', () => {
	let createFile: CreateFile;
	let mockRepo: jest.Mocked<SaveFileRepo>;
	let input: SaveFileDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn(),
			findUserGroupFileId: jest.fn()
		};
		input = {
			id: 'unique-id',
			name: 'fajlnejm.exe',
			actorId: 'actorId',
			path: 'path',
			buffer: Buffer.from('test buffer'),
			sharingType: SharingType.USER_GROUP,
			sharingParticipants: {
				userGroupId: 'u2'
			}
		};
		createFile = new CreateFile(input, mockRepo);
	});

	it('Should save a File', async () => {
		const result = await createFile.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});