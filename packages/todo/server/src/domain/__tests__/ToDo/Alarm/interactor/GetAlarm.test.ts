import {GetAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/GetAlarmRepo';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {GetAlarm} from '@copor/todo/domain/ToDo/Alarm/interactor/GetAlarm';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

describe('get alarm tests', () => {
	const mockGetAlarmRepo: jest.Mocked<GetAlarmRepo> = {
		load: jest.fn()
	};
	const uniqueId = 'someId';
	const mockedReturnAlarm: GetAlarmDTO = {
		id: 'unique-id',
		alarmableId: 'someId',
		alarmTime: new Date(),
		alarmableType: AlarmableType.PRIVATE_TODO,
		alarmStatus: AlarmStatus.ACTIVE,
		repeatFrequency: AlarmRepeatFrequency.NONE
	};
	const getAlarm = new GetAlarm(uniqueId, mockGetAlarmRepo);

	it('should return alarm', async () => {
		mockGetAlarmRepo.load.mockResolvedValue(mockedReturnAlarm);

		expect(await getAlarm.execute()).toEqual(mockedReturnAlarm);
		expect(mockGetAlarmRepo.load).toHaveBeenCalledWith(uniqueId);
	});
});