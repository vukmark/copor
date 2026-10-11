import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';
import {GetChecklist} from '@copor/checklist/domain/Checklist/interactor/GetChecklist';
import {LogGetChecklist} from '@copor/checklist/domain/Checklist/logger/LogGetChecklist';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetChecklistViewModel} from './GetChecklistViewModel';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetChecklistValidatorStorageRepoPicker} from './repo/repoPicker/GetChecklistValidatorStorageRepoPicker';
import {GetChecklistInteractorRepoPicker} from './repo/repoPicker/GetChecklistInteractorRepoPicker';
import {GetChecklistLoggerRepoPicker} from './repo/repoPicker/GetChecklistLoggerRepoPicker';
import {GetChecklistPresenter} from './GetChecklistPresenter';
import {ValidateGetChecklistDTO} from '@copor/checklist/domain/Checklist/validations/dto/ValidateGetChecklistDTO';
import {ValidateGetChecklist} from '@copor/checklist/domain/Checklist/validations/ValidateGetChecklist';

export interface GetChecklistParams {
	id: string;
}

export class GetChecklistController extends BaseController<undefined, GetChecklistViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetChecklistParams;
		const id: string = params.id;
		const actorId = this.actorId;

		const factory = this.container.getFactory(
			RunFactory<GetChecklistDTO>,
			this.getValidator(actorId, id),
			this.getInteractor(id),
			this.getLogger(actorId, id)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetChecklistPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetChecklistDTO = {
			actorId: actorId,
			checklistId: id
		};

		return c.getValidator(
			ValidateGetChecklist,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetChecklistValidatorStorageRepoPicker)
		);
	}

	private getLogger(actorId: string, id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetChecklistLoggerRepoPicker);
		const logData = {
			checklistId: id
		};

		return this.container.getLogger(
			LogGetChecklist,
			loggerRepository,
			new CreateLogDetails(actorId),
			logData
		);
	}

	private getInteractor(id: string) {
		const interactorRepository = this.container.getNewRepoPicker(GetChecklistInteractorRepoPicker);

		return this.container.getInteractor(
			GetChecklist,
			interactorRepository,
			id
		);
	}
}
