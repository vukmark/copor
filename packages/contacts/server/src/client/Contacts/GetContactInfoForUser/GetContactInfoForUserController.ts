import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetContactInfoForUserViewModel} from '@copor/contacts/client/Contacts/GetContactInfoForUser/GetContactInfoForUserViewModel';
import {GetContactInfoForUserPresenter} from '@copor/contacts/client/Contacts/GetContactInfoForUser/GetContactInfoForUserPresenter';
import {GetContactInfoForUserValidatorRepoPicker}
	from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/repoPicker/GetContactInfoForUserValidatorRepoPicker';
import {GetContactInfoForUser} from '@copor/contacts/domain/Contacts/interactor/GetContactInfoForUser';
import {GetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/interactor/dto/GetContactInfoForUserDTO';
import {ValidateGetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/validation/dto/ValidateGetContactInfoForUserDTO';
import {GetContactInfoForUserLoggerRepoPicker}
	from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/repoPicker/GetContactInfoForUserLoggerRepoPicker';
import {LogGetContactInfoForUser} from '@copor/contacts/domain/Contacts/logger/LogGetContactInfoForUser';
import {GetContactInfoForUserInteractorRepoPicker}
	from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/repoPicker/GetContactInfoForUserInteractorRepoPicker';
import {ValidateGetContactInfoForUser} from '@copor/contacts/domain/Contacts/validation/ValidateGetContactInfoForUser';
import {GetContactInfoForUserValidatorPermissionRepoPicker}
	from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/repoPicker/GetContactInfoForUserValidatorPermissionRepoPicker';

export interface GetContactInfoForUserParams {
	id: string;
}

export class GetContactInfoForUserController extends BaseController<undefined, GetContactInfoForUserViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetContactInfoForUserParams;
		const userId: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
            RunFactory<GetContactInfoForUserDTO>,
            this.getValidator(actorId, userId),
            this.getInteractor(userId),
            this.getLogger(actorId, userId)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetContactInfoForUserPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetContactInfoForUserDTO = {actorId, userId: id};

		return c.getValidator(
			ValidateGetContactInfoForUser,
			validatorInput,
			c.getNewRepoPicker(GetContactInfoForUserValidatorPermissionRepoPicker),
			c.getNewRepoPicker(GetContactInfoForUserValidatorRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetContactInfoForUserLoggerRepoPicker);
		const logData = {
			id: id
		};

		return this.container.getLogger(
			LogGetContactInfoForUser,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetContactInfoForUserInteractorRepoPicker);

		return this.container.getInteractor(
			GetContactInfoForUser,
			interactorRepository,
			id
		);
	}
}
