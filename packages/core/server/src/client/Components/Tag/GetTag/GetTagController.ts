import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetTagViewModel} from './GetTagViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetTagValidatorStorageRepoPicker} from './repo/repoPicker/GetTagValidatorStorageRepoPicker';
import {GetTagInteractorRepoPicker} from './repo/repoPicker/GetTagInteractorRepoPicker';
import {GetTagLoggerRepoPicker} from './repo/repoPicker/GetTagLoggerRepoPicker';
import {GetTagPresenter} from './GetTagPresenter';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {ValidateGetTagDTO} from '@copor/core/domain/Components/Tag/validation/dto/ValidateGetTagDTO';
import {ValidateGetTag} from '@copor/core/domain/Components/Tag/validation/ValidateGetTag';
import {LogGetTag} from '@copor/core/domain/Components/Tag/logger/LogGetTag';
import {GetTag} from '@copor/core/domain/Components/Tag/interactor/GetTag';

export interface GetTagParams {
	id: string;
}

export class GetTagController extends BaseController<undefined, GetTagViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetTagParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetTagDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetTagPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetTagDTO = {
			actorId: this.actorId,
			tagId: id
		};

		return c.getValidator(
			ValidateGetTag,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetTagValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetTagLoggerRepoPicker);
		const logData = {
			tag: id
		};

		return this.container.getLogger(
			LogGetTag,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetTagInteractorRepoPicker);

		return this.container.getInteractor(
			GetTag,
			interactorRepository,
			id
		);
	}
}
