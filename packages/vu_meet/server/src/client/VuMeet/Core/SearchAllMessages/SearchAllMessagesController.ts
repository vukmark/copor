import {BaseController} from '@copor/core/client/Core/BaseController';
import {GetSearchAllMessagesListInteractorRepoPicker}
	from './repo/repoPicker/GetSearchAllMessagesListInteractorRepoPicker';
import {GetSearchAllMessagesListLoggerRepoPicker}
	from './repo/repoPicker/GetSearchAllMessagesListLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SearchAllMessagesDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/SearchAllMessagesDTO';
import {ValidateSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/validations/ValidateSearchAllMessages';
import {SearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/interactor/SearchAllMessages';
import {LogSearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/logger/LogSearchAllMessages';

export interface SearchAllMessagesViewModel {
	chatId: string;
	chatName: string;
	chatPicture: string;
	isPrivate: boolean;
	messageId: string;
	senderId: string;
	senderName: string;
	senderPicture: string;
	createdAt: Date;
}

class SearchAllMessagesParams {
	prompt: string;
}

export class SearchAllMessagesController extends BaseController<void, SearchAllMessagesViewModel[]> {
	async getResponse() {
		const params = this.request.params as SearchAllMessagesParams;

		if (!params.prompt)
			params.prompt = '';
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<SearchAllMessagesDTO[]>,
			this.getValidator(),
			this.getInteractor(params.prompt),
			this.getLogger(params.prompt)
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
			ValidateSearchAllMessages,
			validatorInput,
			validatorPermissionRepo,
			undefined
		);
	}
	private getInteractor(prompt: string) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(GetSearchAllMessagesListInteractorRepoPicker);

		return container.getInteractor(SearchAllMessages, interactorRepo, {prompt, actorId: this.actorId});
	}
	private getLogger(prompt: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(GetSearchAllMessagesListLoggerRepoPicker);

		return container.getLogger(LogSearchAllMessages, loggerRepo, new CreateLogDetails(this.actorId), {prompt: prompt});
	}
}
