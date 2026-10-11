import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {CreateAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/CreateAlarm';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus, SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

describe('Create to-do alarm tests', () => {
	let inputDto: SaveAlarmDTO;
	let mockRepo: jest.Mocked<SaveAlarmRepo>;
	let createToDoAlarm: CreateAlarm;

	beforeEach(() => {
		inputDto = {
			id: 'uniqueId',
			alarmableId: 'uniqueId',
			alarmableType: AlarmableType.PRIVATE_TODO,
			alarmTime: new Date(),
			repeatFrequency: AlarmRepeatFrequency.NONE,
			alarmStatus: AlarmStatus.DISMISSED,
			actorId: 'uniqueId'
		};
		mockRepo = {
			save: jest.fn()
		};
		createToDoAlarm = new CreateAlarm(inputDto, mockRepo);
	});
	it('should save todo alarm', async () => {
		const result = await createToDoAlarm.execute();

		expect(result).toEqual('uniqueId');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDto);
	});
});
