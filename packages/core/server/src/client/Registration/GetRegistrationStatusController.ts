import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetRegistrationStatus} from '@copor/core/domain/Registration/interactor/GetRegistrationStatus';
import {RegistrationStatusDTO} from '@copor/core/domain/Registration/interactor/dto/RegistrationStatusDTO';
import {RegistrationStatusRepoPicker} from '@copor/core/client/Registration/repo/repoPicker/RegistrationStatusRepoPicker';

// GET /registration/status — public. Lets the login page decide whether to offer signup.
export class GetRegistrationStatusController extends BaseController<undefined, RegistrationStatusDTO> {
	async getResponse(): Promise<void> {
		const status = await this.container.getInteractor(
			GetRegistrationStatus,
			this.container.getNewRepoPicker(RegistrationStatusRepoPicker),
			undefined
		).execute();

		this.response.status(200);
		this.response.send(status);
	}
}
