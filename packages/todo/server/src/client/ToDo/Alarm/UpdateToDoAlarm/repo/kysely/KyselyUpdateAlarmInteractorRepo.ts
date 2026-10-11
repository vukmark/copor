import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';


export class KyselyUpdateAlarmInteractorRepo extends TimeTransformer implements SaveAlarmRepo {
	async save(saveDTO: SaveAlarmDTO): Promise<void> {
		await db
			.updateTable('alarm')
			.set({
				alarmableId: saveDTO.alarmableId,
				alarmableType: saveDTO.alarmableType,
				alarmTime: this.toUtc(saveDTO.alarmTime),
				repeatFrequency: saveDTO.repeatFrequency,
				alarmStatus: saveDTO.alarmStatus
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
