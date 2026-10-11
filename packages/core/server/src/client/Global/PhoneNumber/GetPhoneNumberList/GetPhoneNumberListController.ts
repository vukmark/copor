import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetPhoneNumberListInteractorRepoPicker} from './repo/repoPicker/GetPhoneNumberListInteractorRepoPicker';
import {GetPhoneNumberListLoggerRepoPicker} from './repo/repoPicker/GetPhoneNumberListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetPhoneNumberViewModel} from './GetPhoneNumberViewModel';
import {GetPhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/GetPhoneNumberDTO';
import {ValidateGetPhoneNumberList}
	from '@copor/core/domain/Core/global/PhoneNumber/validations/ValidateGetPhoneNumberList';
import {GetPhoneNumberList} from '@copor/core/domain/Core/global/PhoneNumber/interactor/GetPhoneNumberList';
import {LogGetPhoneNumberList} from '@copor/core/domain/Core/global/PhoneNumber/logger/LogGetPhoneNumberList';
import {GetPhoneNumberListValidatorRepoPicker} from './repo/repoPicker/GetPhoneNumberListValidatorRepoPicker';

export interface GetPhoneNumberListParams {
	id: string;
}

export class GetPhoneNumberListController extends BaseController<void, GetPhoneNumberViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetPhoneNumberListParams;
		const id: string = params.id;

		const container = this.container;
		const factory = container.getFactory(
			RunFactory<GetPhoneNumberDTO[]>,
			this.getValidator(id),
			this.getInteractor(id),
			this.getLogger(id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(id: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetPhoneNumberListValidatorRepoPicker);

		const validatorInput = {actorId: this.actorId, user: id};

		return container.getValidator(
			ValidateGetPhoneNumberList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(userId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetPhoneNumberListInteractorRepoPicker);

		return container.getInteractor(GetPhoneNumberList, interactorRepo, userId);
	}
	private getLogger(userId: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetPhoneNumberListLoggerRepoPicker);

		return container.getLogger(LogGetPhoneNumberList, loggerRepo, new CreateLogDetails(this.actorId), {userId: userId});
	}
}
