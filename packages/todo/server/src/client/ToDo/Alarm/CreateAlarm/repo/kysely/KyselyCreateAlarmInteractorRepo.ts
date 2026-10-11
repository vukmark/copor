import {SaveAlarmRepo} from '@copor/todo/domain/ToDo/Alarm/repository/SaveAlarmRepo';
import {SaveAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyCreateAlarmInteractorRepo extends TimeTransformer implements SaveAlarmRepo {
	async save(saveDTO: SaveAlarmDTO): Promise<void> {
		await db
			.insertInto('alarm')
			.values({
				id: saveDTO.id,
				alarmableType: saveDTO.alarmableType,
				alarmableId: saveDTO.alarmableId,
				alarmTime: this.toUtc(saveDTO.alarmTime),
				alarmStatus: saveDTO.alarmStatus,
				repeatFrequency: saveDTO.repeatFrequency
			})
			.execute();
	}
}