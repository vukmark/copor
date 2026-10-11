import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {db} from '@copor/core/client/AppDataSource';
import {GetStateListRepo} from '@copor/core/domain/Components/State/repository/GetStateListRepo';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class KyselyGetStateListInteractorRepo implements GetStateListRepo {
	public async list(countryId: string): Promise<GetStateDTO[]> {
		if (countryId === '') {
			const results = await db
				.selectFrom('state')
				.select([
					'id',
					'name',
					'code',
					'countryId',
					'publishStatus'
				] as const)
				.execute();

			return results.map((result) => {
				return {
					... result,
					countryId: result.countryId!,
					publishStatus: result.publishStatus
				};
			});
		}

		const results = await db
			.selectFrom('state')
			.select(['id', 'name', 'code', 'countryId', 'publishStatus'] as const)
			.where('countryId', '=', countryId)
			.execute();

		return results.map((result) => {
			return {
				... result,
				countryId: result.countryId!,
				publishStatus: result.publishStatus
			};
		});
	}
}