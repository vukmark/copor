import {BaseController} from '@copor/core/client/Core/BaseController';
import {
	GetPrivateTagListForUserInteractorRepoPicker
} from './repo/repoPicker/GetPrivateTagListForUserInteractorRepoPicker';
import {GetPrivateTagListForUserLoggerRepoPicker} from './repo/repoPicker/GetPrivateTagListForUserLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {Color} from '@copor/core/domain/Core/enum/Color';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ValidateGetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/validation/ValidateGetPrivateTagListForUser';
import {GetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/interactor/GetPrivateTagListForUser';
import {LogGetPrivateTagListForUser} from '@copor/core/domain/Components/Tag/logger/LogGetPrivateTagListForUser';
import {GetPrivateTagListForUserValidatorPermissionRepoPicker} from '@copor/core/client/Components/Tag/GetPrivateTagListForUser/repo/repoPicker/GetPrivateTagListForUserValidatorPermissionRepoPicker';
import {ColorSet} from '@copor/core/domain/Core/enum/dto/ColorSet';


interface GetTagViewModel {
	id: string;
	name: string;
	color: Color;
	colorSet: ColorSet;
	description?: string;
	isPrivate?: boolean;
}

interface GetPrivateTagListForUserParams {
	searchPrompt: string;
}

export class GetPrivateTagListForUserController extends BaseController<void, GetTagViewModel[]> {
	async getResponse() {
		const params = this.request.params as GetPrivateTagListForUserParams;

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
		const validatorPermissionRepo = container.getNewRepoPicker(GetPrivateTagListForUserValidatorPermissionRepoPicker);
		const validatorInput = this.actorId;

		return container.getValidator(
			ValidateGetPrivateTagListForUser,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(searchPrompt: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetPrivateTagListForUserInteractorRepoPicker);

		return container.getInteractor(GetPrivateTagListForUser, interactorRepo, {actorId: this.actorId, prompt: searchPrompt});
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetPrivateTagListForUserLoggerRepoPicker);

		return container.getLogger(LogGetPrivateTagListForUser, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
