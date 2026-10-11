import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {VerifyRegistration} from '@copor/core/domain/Registration/interactor/VerifyRegistration';
import {VerifyRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/VerifyRegistrationDTO';
import {ValidateVerifyRegistration} from '@copor/core/domain/Registration/validations/ValidateVerifyRegistration';
import {LogVerifyRegistration} from '@copor/core/domain/Registration/logger/LogVerifyRegistration';
import {VerifyRegistrationReqBodyDTO} from '@copor/core/client/Registration/dto/VerifyRegistrationReqBodyDTO';
import {
	ValidateVerifyRegistrationRepoPicker
} from '@copor/core/client/Registration/repo/repoPicker/ValidateVerifyRegistrationRepoPicker';
import {VerifyRegistrationRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/VerifyRegistrationRepoPicker';
import {RegistrationLoggerRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/RegistrationLoggerRepoPicker';

// POST /registration/verify — public. Activates the account when the emailed code matches.
export class VerifyRegistrationController extends BaseController<VerifyRegistrationReqBodyDTO, void> {
	async getResponse(): Promise<void> {
		const input: VerifyRegistrationDTO = {
			email: (this.request.body?.email ?? '').trim(),
			code: (this.request.body?.code ?? '').trim()
		};
		const validatorRepo = this.container.getNewRepoPicker(ValidateVerifyRegistrationRepoPicker);
		// Only used as the log actor; the log is written only after a successful verification.
		const userId = await validatorRepo.getPendingUserId(input.email) ?? '';

		const factory = this.container.getFactory(
			RunFactory<void>,
			new ValidateVerifyRegistration(input, validatorRepo),
			this.container.getInteractor(
				VerifyRegistration,
				this.container.getNewRepoPicker(VerifyRegistrationRepoPicker),
				input.email
			),
			this.container.getLogger(
				LogVerifyRegistration,
				this.container.getNewRepoPicker(RegistrationLoggerRepoPicker),
				new CreateLogDetails(userId),
				undefined
			)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(200).end();
	}
}
