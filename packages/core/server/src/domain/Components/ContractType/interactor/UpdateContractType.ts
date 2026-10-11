import {SaveContractTypeDTO} from './dto/SaveContractTypeDTO';
import {SaveContractTypeRepo} from '../repository/SaveContractTypeRepo';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';

export class UpdateContractType extends ExecuteUseCase<SaveContractTypeDTO, SaveContractTypeRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
