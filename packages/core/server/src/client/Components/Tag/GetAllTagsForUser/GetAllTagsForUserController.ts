import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {GetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/interactor/GetPrivateTagListForUser';
import {GetTagViewModel} from '@copor/core/client/Components/Tag/GetTag/GetTagViewModel';
import {ValidateGetAllTagsForUser} from '@copor/core/domain/Components/Tag/validation/ValidateGetAllTagsForUser';
import {
	GetAllTagsForUserInteractorRepoPicker
} from '@copor/core/client/Components/Tag/GetAllTagsForUser/repo/repoPicker/GetAllTagsForUserInteractorRepoPicker';
import {
	GetAllTagsForUserLoggerRepoPicker
} from '@copor/core/client/Components/Tag/GetAllTagsForUser/repo/repoPicker/GetAllTagsForUserLoggerRepoPicker';
import {LogGetAllTagsForUser} from '@copor/core/domain/Components/Tag/logger/LogGetAllTagsForUser';

interface GetTagListForUserParams {
	searchPrompt: string;
}

export class GetAllTagsForUserController extends BaseController<void, GetTagViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetTagListForUserParams;

		if (!params.searchPrompt)
			params.searchPrompt = '';
		const container = this.container;
		const factory = container.getFactory(
            RunFactory<GetTagDTO[]>,
            this.getValidator(),
            this.getInteractor(params.searchPrompt),
            this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		this.response.send(response);
	}
	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetAllTagsForUser,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(searchPrompt: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetAllTagsForUserInteractorRepoPicker);

		return container.getInteractor(GetPrivateTagListForUser, interactorRepo, {actorId: this.actorId, prompt: searchPrompt});
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetAllTagsForUserLoggerRepoPicker);

		return container.getLogger(LogGetAllTagsForUser, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
