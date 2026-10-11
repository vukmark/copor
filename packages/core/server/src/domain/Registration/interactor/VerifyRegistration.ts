import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {VerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/VerifyRegistrationRepo';

export class VerifyRegistration extends ExecuteUseCase<string, VerifyRegistrationRepo, void> {
	public execute(): Promise<void> {
		return this.repository.activate(this.input);
	}
}
