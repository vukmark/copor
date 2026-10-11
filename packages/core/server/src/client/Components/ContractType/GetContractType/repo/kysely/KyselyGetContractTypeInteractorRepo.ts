import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/GetContractTypeDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyGetContractTypeInteractorRepo implements GetItem<GetContractTypeDTO> {
	async load(id: string): Promise<GetContractTypeDTO> {
		const result = await db
			.selectFrom('contractType')
			.select(['id', 'name', 'description', 'file', 'publishStatus'])
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`Contract Type with id ${id} not found`);
		}

		return {
			... result,
			description: result.description ?? undefined
		};
	}
}
