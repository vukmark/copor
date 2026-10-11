import {PaginatedTableBaseController} from '@copor/core/client/Core/Controller/PaginatedTableBaseController';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {PaginatedTableModelDTO} from '@copor/core/client/Core/Table/dto/TableModelDTO';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {ValidateGetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/validations/ValidateGetNativeLanguageList';
import {
	GetNativeLanguageListInteractorRepoPicker
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListInteractorRepoPicker';
import {GetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguageList';
import {
	GetNativeLanguageListLoggerRepoPicker
} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListLoggerRepoPicker';
import {LogGetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguageList';
import {GetNativeLanguageTablePresenter} from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageTable/GetNativeLanguageTablePresenter';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {LogAction} from '@copor/core/domain/Core/Logger/LogAction';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {PaginationParams} from '@copor/core/client/Core/Presenter/PaginationParams';
import {Presenter} from '@copor/core/client/Interface/Presenter';

export class GetNativeLanguageTableController extends PaginatedTableBaseController<GetNativeLanguageDTO> {
	protected getPresenter(response: GetNativeLanguageDTO[], paginationParams: PaginationParams): Presenter<PaginatedTableModelDTO> {
		return this.container.getPresenter(GetNativeLanguageTablePresenter, response, this.container.appContext, paginationParams);
	}

	protected getValidator(): Validator {
		return this.container.getValidator(
			ValidateGetNativeLanguageList,
			this.actorId,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			undefined
		);
	}

	protected getInteractor(): UseCase<GetNativeLanguageDTO[]> {
		return this.container.getInteractor(
			GetNativeLanguageList,
			this.container.getNewRepoPicker(GetNativeLanguageListInteractorRepoPicker),
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset,
				limit: this.request.body.limit
			}
		);
	}

	protected getLogger(): LogAction {
		return this.container.getLogger(
			LogGetNativeLanguageList,
			this.container.getNewRepoPicker(GetNativeLanguageListLoggerRepoPicker),
			new CreateLogDetails(this.actorId),
			undefined
		);
	}
}
