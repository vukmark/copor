import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';

export class KyselyGetDefaultCountryInteractorRepo implements GetItem<GetCountryDTO[]> {
	async load(id: string): Promise<GetCountryDTO[]> {
		const country = await db
			.selectFrom('country')
			.select(['id', 'name', 'code', 'publishStatus'])
			.where((qb) => qb(
				'name', 'like', '%ermany%')
				.or('name', 'like', '%eutschland%')
			)
			.executeTakeFirst();

		if (!country) {
			throw new Error('Default country not found');
		}

		return [country];
	}
}
