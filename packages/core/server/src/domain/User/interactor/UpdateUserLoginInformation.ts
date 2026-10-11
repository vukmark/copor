import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {UpdateUserLoginInformationDTO} from '@copor/core/domain/User/interactor/dto/UpdateUserLoginInformationDTO';
import {UpdateUserLoginInformationRepo} from '@copor/core/domain/User/repository/UpdateUserLoginInformationRepo';

export class UpdateUserLoginInformation extends ExecuteUseCase<UpdateUserLoginInformationDTO, UpdateUserLoginInformationRepo, void> {
	public execute(): Promise<void> {
		return this.repository.save(this.input);
	}
}