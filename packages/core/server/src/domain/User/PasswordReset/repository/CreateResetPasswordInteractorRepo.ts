import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {ResetPasswordDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/ResetPasswordDTO';
import {ResetPasswordRepo} from '@copor/core/domain/User/PasswordReset/repository/ResetPasswordRepo';

export class CreateResetPasswordInteractorRepo extends ExecuteUseCase<ResetPasswordDTO, ResetPasswordRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.verifyAndReset(this.input);
	}
}