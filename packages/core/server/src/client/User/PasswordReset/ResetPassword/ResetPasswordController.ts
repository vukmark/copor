import {BaseController} from '@copor/core/client/Core/BaseController';
import {ResetPasswordReqBodyDTO} from '@copor/core/client/User/PasswordReset/ResetPassword/dto/ResetPasswordReqBodyDTO';
import {ResetPasswordDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/ResetPasswordDTO';
import {CreateResetPasswordInteractorRepo} from '@copor/core/domain/User/PasswordReset/repository/CreateResetPasswordInteractorRepo';
import {
	ResetPasswordInteractorRepoPicker
} from '@copor/core/client/User/PasswordReset/ResetPassword/repo/repoPicker/ResetPasswordInteractorRepoPicker';
import {
	ResetPasswordValidatorStorageRepoPicker
} from '@copor/core/client/User/PasswordReset/ResetPassword/repo/repoPicker/ResetPasswordValidatorStorageRepoPicker';
import {ValidateResetPassword} from '@copor/core/domain/User/PasswordReset/validation/ValidateResetPassword';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

export class ResetPasswordController extends BaseController<ResetPasswordReqBodyDTO, void> {
	async getResponse(): Promise<void> {
		const {userName, code, newPassword} = this.request.body;

		await this.validate(userName, newPassword);

		const interactor = this.getInteractor(userName, code, newPassword);

		await interactor.execute();

		this.response.status(200).end();
	}

	private async validate(userName: string, newPassword: string): Promise<void> {
		const validatorStorageRepo = this.container.getNewRepoPicker(ResetPasswordValidatorStorageRepoPicker);

		const validationResult = await new ValidateResetPassword(
			{userName, password: newPassword},
			validatorStorageRepo
		).validate();

		if (validationResult instanceof ErrorList) {
			throw validationResult;
		}
	}

	private getInteractor(userName: string, code: string, newPassword: string) {
		const interactorRepository = this.container.getNewRepoPicker(ResetPasswordInteractorRepoPicker);
		const interactorInput: ResetPasswordDTO = {userName, code, newPassword};

		return this.container.getInteractor(
			CreateResetPasswordInteractorRepo,
			interactorRepository,
			interactorInput
		);
	}
}