import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus, SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {UpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/UpdateAlarm';

describe('Update To Do Alarm tests', () => {
	let mockRepo: jest.Mocked<SaveAlarmRepo>;
	let inputDTO: SaveAlarmDTO;
	let updateToDoAlarm: UpdateAlarm;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'uniqueId',
			alarmableId: 'uniqueId',
			alarmableType: AlarmableType.PRIVATE_TODO,
			alarmTime: new Date(),
			repeatFrequency: AlarmRepeatFrequency.NONE,
			alarmStatus: AlarmStatus.DISMISSED,
			actorId: 'uniqueId'
		};
		updateToDoAlarm = new UpdateAlarm(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateToDoAlarm.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});