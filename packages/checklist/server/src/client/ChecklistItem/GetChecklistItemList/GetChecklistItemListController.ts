import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetChecklistItemListInteractorRepoPicker} from './repo/repoPicker/GetChecklistItemListInteractorRepoPicker';
import {GetChecklistItemList} from '@copor/checklist/domain/ChecklistItem/interactor/GetChecklistItemList';
import {GetChecklistItemListLoggerRepoPicker} from './repo/repoPicker/GetChecklistItemListLoggerRepoPicker';
import {LogGetChecklistItemList} from '@copor/checklist/domain/ChecklistItem/logger/LogGetChecklistItemList';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {GetChecklistItemDTO} from '@copor/checklist/domain/ChecklistItem/interactor/dto/GetChecklistItemDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetChecklistItemViewModel} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/GetChecklistItemViewModel';
import {ValidateGetChecklistItemList} from '@copor/checklist/domain/ChecklistItem/validations/ValidateGetChecklistItemList';
import {GetChecklistItemListPresenter} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/GetChecklistItemListPresenter';
import {
	GetChecklistItemListValidatorStorageRepoPicker
} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/repo/repoPicker/GetChecklistItemListValidatorStorageRepoPicker';

interface GetChecklistItemListControllerParams {
	checklistId: string
}
export class GetChecklistItemListController extends BaseController<void, GetChecklistItemViewModel[]> {
	async getResponse() {
		const container = this.container;
		const params = this.request.params as GetChecklistItemListControllerParams;
		const factory = container.getFactory(
			RunFactory<GetChecklistItemDTO[]>,
			this.getValidator(params.checklistId),
			this.getInteractor(params.checklistId),
			this.getLogger()
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		const presenter = this.container.getPresenter(GetChecklistItemListPresenter, response);
		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}
	private getValidator(checklistId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(GetChecklistItemListValidatorStorageRepoPicker);
		const validatorInput = {
			actorId: this.actorId,
			checklistId: checklistId
		};

		return container.getValidator(
			ValidateGetChecklistItemList,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(checklistId: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetChecklistItemListInteractorRepoPicker);

		return container.getInteractor(GetChecklistItemList, interactorRepo, checklistId);
	}
	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetChecklistItemListLoggerRepoPicker);

		return container.getLogger(LogGetChecklistItemList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
