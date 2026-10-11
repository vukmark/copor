import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {VerifyResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/VerifyResetCodeDTO';
import {VerifyResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/VerifyResetCodeRepo';

export class CreateVerifyResetCodeInteractorRepo extends ExecuteUseCase<VerifyResetCodeDTO, VerifyResetCodeRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.verifyCode(this.input);
	}
}