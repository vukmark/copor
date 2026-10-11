import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyGetAlarmInteractorRepo extends TimeTransformer implements GetItem<GetAlarmDTO> {
	async load(id: string): Promise<GetAlarmDTO> {
		const result = await db
			.selectFrom('alarm')
			.select(['id', 'alarmableId', 'alarmableType', 'alarmTime', 'alarmStatus', 'repeatFrequency'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Alarm with id ${id} not found`);
		}

		const preparedResult: GetAlarmDTO = {
			... result,
			alarmTime: this.fromUtc(result.alarmTime)
		};

		return preparedResult;
	}
}
