import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';


export class FakeUpdateAlarmInteractorRepo implements SaveAlarmRepo {
	save(saveDTO: SaveAlarmDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
