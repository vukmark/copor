import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {GetAlarmList} from '@copor/todo/domain/ToDo/Alarm/interactor/GetAlarmList';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

describe('get alarm list tests', () => {
	const mockRepo: jest.Mocked<ListItems<GetAlarmDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetAlarmDTO[] = [{
		id: 'unique-id',
		alarmableId: 'someId',
		alarmTime: new Date(),
		alarmableType: AlarmableType.PRIVATE_TODO,
		alarmStatus: AlarmStatus.ACTIVE,
		repeatFrequency: AlarmRepeatFrequency.NONE
	}];
	const getAlarmList: GetAlarmList = new GetAlarmList([], mockRepo);

	it('should list all alarms', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);

		expect(await getAlarmList.execute()).toEqual(expectedResponse);
	});
});
