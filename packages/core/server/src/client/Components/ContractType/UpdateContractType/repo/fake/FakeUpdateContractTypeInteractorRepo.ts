import {SaveContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/SaveContractTypeRepo';
import {SaveContractTypeDTO} from '@copor/core/domain/Components/ContractType/interactor/dto/SaveContractTypeDTO';

export class FakeUpdateContractTypeInteractorRepo implements SaveContractTypeRepo {
	save(saveDTO: SaveContractTypeDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
