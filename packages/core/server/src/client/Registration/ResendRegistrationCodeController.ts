import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {NoOpLogger} from '@copor/core/domain/Core/Logger/NoOpLogger';
import {ResendRegistrationCode} from '@copor/core/domain/Registration/interactor/ResendRegistrationCode';
import {ValidateResendRegistrationCode} from '@copor/core/domain/Registration/validations/ValidateResendRegistrationCode';
import {ResendRegistrationCodeReqBodyDTO} from '@copor/core/client/Registration/dto/ResendRegistrationCodeReqBodyDTO';
import {RegistrationStatusRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/RegistrationStatusRepoPicker';
import {
	ResendRegistrationCodeRepoPicker
} from '@copor/core/client/Registration/repo/repoPicker/ResendRegistrationCodeRepoPicker';
import {RegistrationVerificationHelper} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';

// POST /registration/resend-code — public. Always 200 while registration is on,
// whether or not a pending account exists, so it can't be used to probe emails.
export class ResendRegistrationCodeController extends BaseController<ResendRegistrationCodeReqBodyDTO, void> {
	async getResponse(): Promise<void> {
		const {code, expiresAt} = RegistrationVerificationHelper.newCode();
		const factory = this.container.getFactory(
			RunFactory<void>,
			new ValidateResendRegistrationCode(this.container.getNewRepoPicker(RegistrationStatusRepoPicker)),
			this.container.getInteractor(
				ResendRegistrationCode,
				this.container.getNewRepoPicker(ResendRegistrationCodeRepoPicker),
				{email: (this.request.body?.email ?? '').trim(), verificationCode: code, codeExpiresAt: expiresAt}
			),
			new NoOpLogger()
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200).end();
	}
}
