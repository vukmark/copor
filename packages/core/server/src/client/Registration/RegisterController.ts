import {BaseController} from '@copor/core/client/Core/BaseController';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {IdGenerator} from '@copor/core/client/Core/IdGenerator/IdGenerator';
import {Register} from '@copor/core/domain/Registration/interactor/Register';
import {SaveRegistrationDTO} from '@copor/core/domain/Registration/interactor/dto/SaveRegistrationDTO';
import {ValidateRegister} from '@copor/core/domain/Registration/validations/ValidateRegister';
import {LogRegister} from '@copor/core/domain/Registration/logger/LogRegister';
import {RegisterReqBodyDTO} from '@copor/core/client/Registration/dto/RegisterReqBodyDTO';
import {RegisterRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/RegisterRepoPicker';
import {ValidateRegisterRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/ValidateRegisterRepoPicker';
import {RegistrationLoggerRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/RegistrationLoggerRepoPicker';
import {RegistrationVerificationHelper} from '@copor/core/client/Registration/helper/RegistrationVerificationHelper';

// POST /registration — public. Creates an inactive USER account and emails a code.
export class RegisterController extends BaseController<RegisterReqBodyDTO, {email: string}> {
	async getResponse(): Promise<void> {
		const input = await this.getInput();
		const factory = this.container.getFactory(
			RunFactory<void>,
			new ValidateRegister(input, this.container.getNewRepoPicker(ValidateRegisterRepoPicker)),
			this.container.getInteractor(Register, this.container.getNewRepoPicker(RegisterRepoPicker), input),
			this.container.getLogger(
				LogRegister,
				this.container.getNewRepoPicker(RegistrationLoggerRepoPicker),
				// The new user is the actor: nobody is logged in yet.
				new CreateLogDetails(input.userId),
				{email: input.email, userName: input.userName}
			)
		);

		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		this.response.status(201);
		this.response.send({email: input.email});
	}

	private async getInput(): Promise<SaveRegistrationDTO> {
		const body = this.request.body ?? {} as RegisterReqBodyDTO;
		const {code, expiresAt} = RegistrationVerificationHelper.newCode();

		return {
			userId: await new IdGenerator().getNewId(),
			firstName: body.firstName ?? '',
			lastName: body.lastName ?? '',
			email: (body.email ?? '').trim(),
			userName: (body.userName ?? '').trim(),
			password: body.password ?? '',
			verificationCode: code,
			codeExpiresAt: expiresAt
		};
	}
}
