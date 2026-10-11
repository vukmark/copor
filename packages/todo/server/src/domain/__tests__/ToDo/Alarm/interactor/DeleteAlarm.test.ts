import {DeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/DeleteAlarm';
import {DeleteAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/DeleteAlarmRepo';

describe('delete To Do tests', () => {
	let deleteToDoAlarm: DeleteAlarm;
	let mockRepo: jest.Mocked<DeleteAlarmRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteToDoAlarm = new DeleteAlarm('unique-id', mockRepo);
	});
	it('should delete alarm', async () => {
		await deleteToDoAlarm.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});
