import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ResendRegistrationCodeDTO} from '@copor/core/domain/Registration/interactor/dto/ResendRegistrationCodeDTO';
import {ResendRegistrationCodeRepo} from '@copor/core/domain/Registration/repository/ResendRegistrationCodeRepo';

export class ResendRegistrationCode
	extends ExecuteUseCase<ResendRegistrationCodeDTO, ResendRegistrationCodeRepo, void> {
	public execute(): Promise<void> {
		return this.repository.resend(this.input);
	}
}
