import {BaseController} from '@copor/core/client/Core/BaseController';
import crypto from 'crypto';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {ForgotPasswordReqBodyDTO} from '@copor/core/client/User/PasswordReset/PasswordResetEmailCode/dto/ForgotPasswordReqBodyDTO';
import {
	SendPasswordResetCodeInteractorRepoPicker
} from '@copor/core/client/User/PasswordReset/PasswordResetEmailCode/repo/repoPicker/SendPasswordResetCodeInteractorRepoPicker';
import {SaveResetCodeDTO} from '@copor/core/domain/User/PasswordReset/interactor/dto/SaveResetCodeDTO';
import {
	CreateSendPasswordResetCodeInteractorRepo
} from '@copor/core/domain/User/PasswordReset/repository/CreateSendPasswordResetCodeInteractorRepo';

export class ForgotPasswordController extends BaseController<ForgotPasswordReqBodyDTO, void> {
	async getResponse(): Promise<void> {
		const usernameOrEmail: string = this.request.body.userName;
		const uniqueId = await this.getUniqueId();

		const code = crypto.randomInt(100000, 999999).toString();
		const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

		const interactor = this.getInteractor(uniqueId, usernameOrEmail, code, expiresAt);

		await interactor.execute();

		this.response.status(200).end();
	}

	private getInteractor(id: string, userNameOrEmail: string, codeHash: string, expiresAt: Date) {
		const interactorRepository = this.container.getNewRepoPicker(SendPasswordResetCodeInteractorRepoPicker);
		const interactorInput: SaveResetCodeDTO = {id, userNameOrEmail, codeHash, expiresAt};

		return this.container.getInteractor(
			CreateSendPasswordResetCodeInteractorRepo,
			interactorRepository,
			interactorInput
		);
	}

	private async getUniqueId(): Promise<string> {
		const uniqueIdGenerator = this.container.getRepository(IdGenerator);

		return await uniqueIdGenerator.getNewId();
	}
}