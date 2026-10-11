import {GetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/interactor/GetAttachmentForToDo';
import {GetAttachmentForToDoRepo} from '@copor/todo/domain/ToDo/ToDoItem/repository/GetAttachmentForToDoRepo';
import {GetAttachmentForToDoDTO} from '@copor/todo/domain/ToDo/ToDoItem/interactor/dto/GetAttachmentForToDoDTO';

describe('Test get attachment for todo', () => {
	let entry: GetAttachmentForToDo;
	let mockRepo: jest.Mocked<GetAttachmentForToDoRepo>;

	const responseDTO: GetAttachmentForToDoDTO = {
		file: Buffer.from('file-contents'),
		fileName: 'worksheet.pdf'
	};

	beforeEach(() => {
		mockRepo = {
			load: jest.fn()
		};
		mockRepo.load.mockResolvedValue(responseDTO);
		entry = new GetAttachmentForToDo('attachment-id', mockRepo);
	});

	it('should load the attachment', async () => {
		const result = await entry.execute();

		expect(result).toEqual(responseDTO);
		expect(mockRepo.load).toHaveBeenCalledWith('attachment-id');
	});
});
