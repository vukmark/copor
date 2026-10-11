import {BaseController} from '@copor/core/client/Core/BaseController';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetListReqBodyDTO} from '@copor/core/client/Core/dto/GetListReqBodyDTO';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PaginatedResponse} from '@copor/core/client/Core/Presenter/PaginatedResponse';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {GetNativeLanguageSimpleListPresenter}
	from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageSimpleList/GetNativeLanguageSimpleListPresenter';
import {ValidateGetNativeLanguageList}
	from '@copor/core/domain/Components/NativeLanguage/validations/ValidateGetNativeLanguageList';
import {GetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/interactor/GetNativeLanguageList';
import {GetNativeLanguageListInteractorRepoPicker}
	from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListInteractorRepoPicker';
import {GetNativeLanguageListLoggerRepoPicker}
	from '@copor/core/client/Components/NativeLanguage/GetNativeLanguageList/repo/repoPicker/GetNativeLanguageListLoggerRepoPicker';
import {LogGetNativeLanguageList} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguageList';

export class GetNativeLanguageSimpleListController extends BaseController<GetListReqBodyDTO, PaginatedResponse<NameAndIdDTO>> {
	async getResponse() {
		const container = this.container;

		const factory = container.getFactory(
            RunFactory<GetNativeLanguageDTO[]>,
            undefined,
            this.getInteractor(),
            this.getLogger()
		);

		const response = await factory.run({skipValidation: true});

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}

		const presenter = container.getPresenter(
			GetNativeLanguageSimpleListPresenter,
			response,
			this.container.appContext,
			{
				limit: this.request.body.limit,
				offset: this.request.body.offset
			}
		);

		const presentedResponse = presenter.present();

		this.response.status(200);
		this.response.send(presentedResponse);
	}

	private getValidator(): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);

		return container.getValidator(
			ValidateGetNativeLanguageList,
			this.actorId,
			validatorPermissionRepo,
			undefined
		);
	}

	private getInteractor() {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetNativeLanguageListInteractorRepoPicker);

		return container.getInteractor(
			GetNativeLanguageList,
			interactorRepo,
			{
				filters: this.request.body.filterList,
				offset: this.request.body.offset ?? undefined,
				limit: this.request.body.limit ?? undefined
			}
		);
	}

	private getLogger() {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetNativeLanguageListLoggerRepoPicker);

		return container.getLogger(LogGetNativeLanguageList, loggerRepo, new CreateLogDetails(this.actorId), undefined);
	}
}
