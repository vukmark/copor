import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ContentType} from '@copor/core/domain/Core/enum/ContentType';
import {ValidateGetContentItemDTO} from '@copor/core/domain/ContentItem/validations/dto/ValidateGetContentItemDTO';
import {ValidateGetContentItem} from '@copor/core/domain/ContentItem/validations/ValidateGetContentItem';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetContentItemValidatorStorageRepoPicker}
	from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemValidatorStorageRepoPicker';
import {GetContentItemFormPresenter} from '@copor/core/client/ContentItem/GetContentItemForm/GetContentItemFormPresenter';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetContentItem} from '@copor/core/domain/ContentItem/interactor/GetContentItem';
import {GetContentItemInteractorRepoPicker} from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemInteractorRepoPicker';
import {GetContentItemLoggerRepoPicker} from '@copor/core/client/ContentItem/GetContentItem/repoPicker/GetContentItemLoggerRepoPicker';
import {LogGetContentItem} from '@copor/core/domain/ContentItem/logger/LogGetContentItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {GetRoleListInteractorRepoPicker} from '@copor/core/client/Components/Role/GetRoleList/repo/repoPicker/GetRoleListInteractorRepoPicker';
import {GetRoleList} from '@copor/core/domain/Components/Role/interactor/GetRoleList';
import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';

export interface GetContentItemFormParams {
	id: string;
}

export class GetContentItemFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetContentItemFormParams;

		const roleList = await this.getRoleListInteractor().execute();
		const contentTypeList = this.getContentTypeList();

		if (!params.id) {
			const presenter = this.container.getPresenter(GetContentItemFormPresenter, {
				contentItem: this.getDefaultContentItemData(),
				contentTypeList,
				roleList
			});

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const factory = this.container.getFactory(
            RunFactory<GetContentItemDTO>,
            this.getContentItemValidator(this.actorId, params.id),
            this.getContentItemInteractor(params.id),
            this.getContentItemLogger(this.actorId, params.id)
		);

		const contentItem = await factory.run();

		if (contentItem instanceof ErrorList) {
			this.next(contentItem);
			return;
		}

		const presenter = this.container.getPresenter(GetContentItemFormPresenter, {
			contentItem,
			contentTypeList,
			roleList
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getDefaultContentItemData(): GetContentItemDTO {
		return {
			content: '',
			contentType: ContentType.PAGE,
			id: '',
			publishDate: new Date('2001-01-01'),
			publishStatus: PublishStatus.unpublished,
			summary: '',
			title: ''
		};
	}

	private getContentTypeList(): NameAndIdDTO[] {
		return Object.values(ContentType)
			.filter((type) => type !== ContentType.TERMS_AND_CONDITIONS)
			.map((type) => ({
				id: type,
				name: type
			}));
	}

	private getContentItemValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetContentItemDTO = {actorId, contentItemId: id};

		return c.getValidator(
			ValidateGetContentItem,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetContentItemValidatorStorageRepoPicker)
		);
	}

	private getContentItemInteractor(id: string) {
		return this.container.getInteractor(
			GetContentItem,
			this.container.getNewRepoPicker(GetContentItemInteractorRepoPicker),
			id
		);
	}

	private getContentItemLogger(actorId: string, id: string) {
		return this.container.getLogger(
			LogGetContentItem,
			this.container.getNewRepoPicker(GetContentItemLoggerRepoPicker),
			new CreateLogDetails(actorId),
			{contentItemId: id}
		);
	}

	private getRoleListInteractor() {
		return this.container.getInteractor(
			GetRoleList,
			this.container.getNewRepoPicker(GetRoleListInteractorRepoPicker),
			[]
		);
	}
}