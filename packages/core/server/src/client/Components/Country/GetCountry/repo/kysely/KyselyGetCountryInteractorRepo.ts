import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {db} from '@copor/core/client/AppDataSource';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';

export class KyselyGetCountryInteractorRepo implements GetItem<GetCountryWithStateListDTO> {
	async load(id: string): Promise<GetCountryWithStateListDTO> {
		const country = await db
			.selectFrom('country')
			.select(['id', 'name', 'code', 'publishStatus'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!country) {
			throw new Error(`Country with id ${id} not found`);
		}
		const stateList = await db
			.selectFrom('state')
			.select(['id', 'name', 'code', 'publishStatus', 'countryId'])
			.where('countryId', '=', id)
			.execute();

		return {
			... country,
			stateList: stateList.map((state) => {
				return {
					... state,
					countryId: state.countryId!,
					publishStatus: state.publishStatus
				};
			}),
			publishStatus: country.publishStatus
		};
	}
}
