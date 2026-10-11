import {SaveContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/SaveContractTypeRepo';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyUpdateContractTypeInteractorRepo implements SaveContractTypeRepo {
	async save(saveDTO: SaveContractTypeDTO): Promise<void> {
		await db
			.updateTable('contractType')
			.set({
				name: saveDTO.name,
				description: saveDTO.description,
				file: saveDTO.file,
				publishStatus: saveDTO.publishStatus
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}
