import {BaseController} from '@copor/core/client/Core/BaseController';
import {SearchMessagesInChatInteractorRepoPicker} from './repo/repoPicker/SearchMessagesInChatInteractorRepoPicker';
import {SearchMessagesInChatLoggerRepoPicker} from './repo/repoPicker/SearchMessagesInChatLoggerRepoPicker';
import {CreateLogDetails} from '@copor/core/client/GlobalRepository/CreateLogDetails';
import {RunFactory} from '@copor/core/domain/Core/Factories/RunFactory';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {SearchMessagesInChatPresenter, SearchMessagesInChatViewModel}
	from './SearchMessagesInChatPresenter';
import {ValidateSearchMessagesInChat}
	from '@copor/vu_meet/domain/VuMeet/Message/validations/ValidateSearchMessagesInChat';
import {SearchMessagesInChat}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/SearchMessagesInChat';
import {LogSearchMessagesInChat}
	from '@copor/vu_meet/domain/VuMeet/Message/logger/LogSearchMessagesInChat';
import {SearchMessagesInChatValidatorStorageRepoPicker}
	from './repo/repoPicker/SearchMessagesInChatValidatorStorageRepoPicker';
import {SearchMessagesInChatInputDTO}
	from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatInputDTO';
import {SearchMessagesInChatDTO} from
	'@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

interface SearchMessagesInChatReqBody {
	chatId: string;
	prompt: string;
}

export class SearchMessagesInChatController extends
	BaseController<SearchMessagesInChatReqBody, SearchMessagesInChatViewModel[]> {
	async getResponse() {
		const container = this.container;
		const factory = container.getFactory(
			RunFactory<SearchMessagesInChatDTO[]>,
			this.getValidator(this.request.body.chatId),
			this.getInteractor(this.request.body),
			this.getLogger(this.request.body.prompt)
		);
		const response = await factory.run();

		if (response instanceof ErrorList) {
			this.next(response);
			return;
		}
		this.response.status(200);
		const presenter = this.container.getPresenter(SearchMessagesInChatPresenter, response);

		this.response.send(presenter.present());
	}
	private getValidator(chatId: string): Validator {
		const container = this.container;
		const validatorPermissionRepo = container.getNewRepoPicker(PermissionValidatorRepoPicker);
		const validatorStorageRepo = container.getNewRepoPicker(SearchMessagesInChatValidatorStorageRepoPicker);
		const validatorInput
			= {
				actorId: this.actorId,
				chatId: chatId
			};

		return container.getValidator(
			ValidateSearchMessagesInChat,
			validatorInput,
			validatorPermissionRepo,
			validatorStorageRepo
		);
	}
	private getInteractor(input: SearchMessagesInChatInputDTO) {
		const container = this.container;
		const interactorRepo = this.container.getNewRepoPicker(SearchMessagesInChatInteractorRepoPicker);

		return container.getInteractor(SearchMessagesInChat, interactorRepo, input);
	}
	private getLogger(prompt: string) {
		const container = this.container;
		const loggerRepo = container.getNewRepoPicker(SearchMessagesInChatLoggerRepoPicker);

		return container.getLogger(LogSearchMessagesInChat, loggerRepo, new CreateLogDetails(this.actorId), {prompt});
	}
}
