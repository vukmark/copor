import {SingleItemBaseController} from '@copor/core/client/Core/Controller/SingleItemBaseController';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {GetContentItemViewModel} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemViewModel';
import {Presenter} from '@copor/core/client/Interface/Presenter';
import {GetContentItemPresenter} from '@copor/core/client/ContentItem/GetContentItem/GetContentItemPresenter';
import {ValidateGetContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateGetContentItemDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {
	GetContentItemValidatorStorageRepoPicker
} from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemValidatorStorageRepoPicker';
import {ValidateGetContentItem} from '@copor/core/domain/ContentItem/validations/ValidateGetContentItem';
import {
	GetContentItemLoggerRepoPicker
} from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemLoggerRepoPicker';
import {LogGetContentItem} from '@copor/core/domain/ContentItem/logger/LogGetContentItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {UseCase} from '@copor/core/domain/Core/Interactors/UseCase';
import {
	GetContentItemInteractorRepoPicker
} from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemInteractorRepoPicker';
import {GetContentItem} from '@copor/core/domain/ContentItem/interactor/GetContentItem';

export class GetContentItemController extends SingleItemBaseController<GetContentItemDTO, GetContentItemViewModel> {
	protected getPresenter(response: GetContentItemDTO): Presenter<GetContentItemViewModel> {
		return this.container.getPresenter(GetContentItemPresenter, response);
	}

	protected getValidator(id: string) {
		const c = this.container;
		const validatorInput: ValidateGetContentItemDTO = {
			actorId: this.actorId,
			contentItemId: id
		};

		return c.getValidator(
			ValidateGetContentItem,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetContentItemValidatorStorageRepoPicker)
		);
	}

	protected getInteractor(id: string): UseCase<GetContentItemDTO> {
		const interactorRepository = this.container.getNewRepoPicker(GetContentItemInteractorRepoPicker);

		return this.container.getInteractor(
			GetContentItem,
			interactorRepository,
			id
		);
	}

	protected getLogger(id: string) {
		const loggerRepository = this.container.getNewRepoPicker(GetContentItemLoggerRepoPicker);
		const logData = {contentItemId: id};

		return this.container.getLogger(
			LogGetContentItem,
			loggerRepository,
			new CreateLogDetails(this.actorId),
			logData
		);
	}
}
