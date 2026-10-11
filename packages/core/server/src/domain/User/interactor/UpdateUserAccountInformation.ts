import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateUserAccountInformationDTO} from './dto/UpdateUserAccountInformationDTO';
import {UpdateUserAccountInformationRepo} from '../repository/UpdateUserAccountInformationRepo';

export class UpdateUserAccountInformation
	extends ExecuteUseCase<UpdateUserAccountInformationDTO, UpdateUserAccountInformationRepo, void> {
	public execute(): Promise<void> {
		return this.repository.save(this.input);
	}
}
