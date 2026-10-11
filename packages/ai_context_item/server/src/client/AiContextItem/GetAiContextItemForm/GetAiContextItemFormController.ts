import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetFormViewModel} from '@copor/core/client/Core/Form/GetFormViewModel';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {ValidateGetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/validations/dto/ValidateGetAiContextItemDTO';
import {ValidateGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/validations/ValidateGetAiContextItem';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {GetAiContextItemValidatorStorageRepoPicker}
	from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemValidatorStorageRepoPicker';
import {GetAiContextItemFormPresenter} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemForm/GetAiContextItemFormPresenter';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {GetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/interactor/GetAiContextItem';
import {GetAiContextItemInteractorRepoPicker} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemInteractorRepoPicker';
import {GetAiContextItemLoggerRepoPicker} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/repoPicker/GetAiContextItemLoggerRepoPicker';
import {LogGetAiContextItem} from '@copor/ai_context_item/domain/AiContextItem/logger/LogGetAiContextItem';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';

export interface GetAiContextItemFormParams {
	id: string;
}

export class GetAiContextItemFormController extends BaseController<undefined, GetFormViewModel> {
	async getResponse(): Promise<void> {
		const params = this.request.params as GetAiContextItemFormParams;

		if (!params.id) {
			const presenter = this.container.getPresenter(GetAiContextItemFormPresenter, {
				aiContextItem: this.getDefaultAiContextItemData()
			});

			this.response.status(200);
			this.response.send(presenter.present());
			return;
		}

		const factory = this.container.getFactory(
            RunFactory<GetAiContextItemDTO>,
            this.getAiContextItemValidator(this.actorId, params.id),
            this.getAiContextItemInteractor(params.id),
            this.getAiContextItemLogger(this.actorId, params.id)
		);

		const aiContextItem = await factory.run();

		if (aiContextItem instanceof ErrorList) {
			this.next(aiContextItem);
			return;
		}

		const presenter = this.container.getPresenter(GetAiContextItemFormPresenter, {
			aiContextItem
		});

		this.response.status(200);
		this.response.send(presenter.present());
	}

	private getDefaultAiContextItemData(): GetAiContextItemDTO {
		return {
			id: '',
			questionDe: '',
			answerDe: '',
			questionEn: '',
			answerEn: ''
		};
	}

	private getAiContextItemValidator(actorId: string, id: string) {
		const c = this.container;
		const validatorInput: ValidateGetAiContextItemDTO = {actorId, aiContextItemId: id};

		return c.getValidator(
			ValidateGetAiContextItem,
			validatorInput,
			c.getNewRepoPicker(PermissionValidatorRepoPicker),
			c.getNewRepoPicker(GetAiContextItemValidatorStorageRepoPicker)
		);
	}

	private getAiContextItemInteractor(id: string) {
		return this.container.getInteractor(
			GetAiContextItem,
			this.container.getNewRepoPicker(GetAiContextItemInteractorRepoPicker),
			id
		);
	}

	private getAiContextItemLogger(actorId: string, id: string) {
		return this.container.getLogger(
			LogGetAiContextItem,
			this.container.getNewRepoPicker(GetAiContextItemLoggerRepoPicker),
			new CreateLogDetails(actorId),
			{aiContextItemId: id}
		);
	}
}