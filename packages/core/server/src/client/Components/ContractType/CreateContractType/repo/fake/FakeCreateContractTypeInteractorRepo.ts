import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';

export class FakeCreateContractTypeInteractorRepo implements SaveItem<SaveContractTypeDTO> {
	save(saveDTO: SaveContractTypeDTO): Promise<void> {
		return Promise.resolve();
	}
}
