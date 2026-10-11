import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetStateInteractorRepo implements GetItem<GetStateDTO> {
	public async load(id: string): Promise<GetStateDTO> {
		const state = await db
			.selectFrom('state as s')
			.select([
				's.id as id',
				's.name as name',
				's.code as code',
				's.countryId as countryId',
				's.publishStatus as publishStatus'
			])
			.where('s.id', '=', id)
			.executeTakeFirst();

		if (!state) {
			throw new Error(`State with id ${id} not found`);
		}

		return {
			id: state.id,
			name: state.name,
			code: state.code,
			countryId: state.countryId,
			publishStatus: state.publishStatus
		};
	}
}
