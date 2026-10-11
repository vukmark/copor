import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {db} from '@copor/core/client/AppDataSource';
import {GetAlarmDTO} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/GetAlarmDTO';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class KyselyGetAlarmListInteractorRepo extends TimeTransformer implements ListItems<GetAlarmDTO> {
	public async list(input: ListRepoInputDTO): Promise<GetAlarmDTO[]> {
		const results = await db
			.selectFrom('alarm')
			.select(['id', 'alarmableId', 'alarmableType', 'alarmTime', 'alarmStatus', 'repeatFrequency'])
			.execute();

		const preparedResult: GetAlarmDTO[]
			= results.map((result) => ({
				... result,
				alarmTime: this.fromUtc(result.alarmTime)
			}));

		return preparedResult;
	}
}
