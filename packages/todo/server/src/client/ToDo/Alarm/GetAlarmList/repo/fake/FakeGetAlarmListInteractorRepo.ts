import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetAlarmListInteractorRepo implements ListItems<GetAlarmDTO> {
	public list(input: ListRepoInputDTO): Promise<GetAlarmDTO[]> {
		return new Promise((resolve) => {
			resolve([
				{
					id: 'stringId',
					alarmableId: 'alarmableId',
					alarmableType: AlarmableType.GROUP_TODO,
					alarmTime: new Date(),
					repeatFrequency: AlarmRepeatFrequency.NONE,
					alarmStatus: AlarmStatus.ACTIVE
				},
				{
					id: 'stringId-2',
					alarmableId: 'alarmableId-2',
					alarmableType: AlarmableType.GROUP_TODO,
					alarmTime: new Date(),
					repeatFrequency: AlarmRepeatFrequency.NONE,
					alarmStatus: AlarmStatus.ACTIVE
				}
			]);
		});
	}
}
