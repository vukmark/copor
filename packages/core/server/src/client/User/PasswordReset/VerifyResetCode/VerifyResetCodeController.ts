import {BaseController} from '@copor/core/client/Core/BaseController';
import {VerifyResetCodeReqBodyDTO} from '@copor/core/client/User/PasswordReset/VerifyResetCode/dto/VerifyResetCodeReqBodyDTO';
import {VerifyResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/VerifyResetCodeDTO';
import {CreateVerifyResetCodeInteractorRepo} from '@copor/core/domain/User/PasswordReset/repository/CreateVerifyResetCodeInteractorRepo';
import {
	VerifyResetCodeInteractorRepoPicker
} from '@copor/core/client/User/PasswordReset/VerifyResetCode/repo/repoPicker/VerifyResetCodeRepoPicker';
import {VerifyResetCodeRepo} from '@copor/core/domain/User/PasswordReset/repository/VerifyResetCodeRepo';

export class VerifyResetCodeController extends BaseController<VerifyResetCodeReqBodyDTO, void> {
	async getResponse(): Promise<void> {
		const userName: string = this.request.body.userName;
		const code: string = this.request.body.code;

		const interactor = this.getInteractor(userName, code);

		await interactor.execute();

		this.response.status(200).end();
	}

	private getInteractor(userName: string, code: string) {
		const interactorRepository: VerifyResetCodeRepo = this.container.getNewRepoPicker(VerifyResetCodeInteractorRepoPicker);
		const interactorInput: VerifyResetCodeDTO = {userName, code};

		return this.container.getInteractor(
			CreateVerifyResetCodeInteractorRepo,
			interactorRepository,
			interactorInput
		);
	}
}