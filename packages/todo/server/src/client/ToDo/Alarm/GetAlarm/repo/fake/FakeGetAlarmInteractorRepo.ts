import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

export class FakeGetAlarmInteractorRepo implements GetItem<GetAlarmDTO> {
	load(id: string): Promise<GetAlarmDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'stringId',
					alarmableId: 'alarmableId',
					alarmableType: AlarmableType.GROUP_TODO,
					alarmTime: new Date(),
					repeatFrequency: AlarmRepeatFrequency.NONE,
					alarmStatus: AlarmStatus.ACTIVE
				}
			);
		});
	}
}
