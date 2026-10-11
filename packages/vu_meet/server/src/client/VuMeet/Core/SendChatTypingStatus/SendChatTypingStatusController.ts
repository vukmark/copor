import {BaseController} from '@copor/core/client/Core/BaseController';
import {TypingStatus} from '@copor/core/domain/Core/enum/TypingStatus';
import {SendChatTypingStatusRepoPicker} from './repo/repoPicker/SendChatTypingStatusRepoPicker';
import {SendTypingStatus} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/SendTypingStatus';
import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';
import {PermissionValidatorRepoPicker} from '@copor/core/client/Core/PermissionValidatorRepo/PermissionValidatorRepoPicker';
import {ValidateSendTypingStatusRepoPicker} from './repo/repoPicker/ValidateSendTypingStatusRepoPicker';
import {ValidateSendTypingStatus} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/ValidateSendTypingStatus';
import {ValidateSendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/validations/dto/ValidateSendTypingStatusDTO';
import {ErrorList} from '@copor/core/domain/Core/Exceptions/ErrorList';

interface SendChatTypingStatusReqBody {
	chatId: string;
	typingStatus: TypingStatus;
}

export class SendChatTypingStatusController
	extends BaseController<SendChatTypingStatusReqBody, void> {
	public async getResponse() {
		const validatorInput: ValidateSendTypingStatusDTO = {
			actorId: this.actorId,
			chatId: this.request.body.chatId
		};
		const validator = this.container.getValidator(
			ValidateSendTypingStatus,
			validatorInput,
			this.container.getNewRepoPicker(PermissionValidatorRepoPicker),
			this.container.getNewRepoPicker(ValidateSendTypingStatusRepoPicker)
		);
		const errorList = await validator.validate();

		if (errorList instanceof ErrorList) {
			this.next(errorList);
			return;
		}

		const repo = this.container.getNewRepoPicker(SendChatTypingStatusRepoPicker);
		const interactorInput: SendTypingStatusDTO = {
			userId: this.actorId,
			chatId: this.request.body.chatId,
			status: this.request.body.typingStatus
		};

		const interactor = new SendTypingStatus(interactorInput, repo);

		await interactor.execute();
		this.response.status(200);
		this.response.send();
	}
}
