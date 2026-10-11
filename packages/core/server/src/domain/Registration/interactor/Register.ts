import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/SaveRegistrationDTO';
import {RegisterRepo} from '@copor/core/domain/Registration/repository/RegisterRepo';

export class Register extends ExecuteUseCase<SaveRegistrationDTO, RegisterRepo, void> {
	public execute(): Promise<void> {
		return this.repository.save(this.input);
	}
}
