import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';

export class KyselyCreateContractTypeInteractorRepo implements SaveItem<SaveContractTypeDTO> {
	async save(saveDTO: SaveContractTypeDTO): Promise<void> {
		await db
			.insertInto('contractType')
			.values({
				id: saveDTO.id,
				name: saveDTO.name,
				file: saveDTO.file,
				description: saveDTO.description ?? null,
				publishStatus: saveDTO.publishStatus,
				... TimestampHelper.getTimestampForCreate(saveDTO.actorId)
			})
			.execute();
	}
}
