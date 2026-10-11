import {BaseController} from '@copor/core/client/Core/BaseController';
import type {
	CreateAiBotMessageReqBodyDTO
} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/dto/CreatePrivateMessageReqBodyDTO';
import {AiBotService} from '@copor/vu_meet/client/VuMeet/AiBot/CreateAiBotMessage/Utilities/AiBotService';

export class CreateAiBotMessageController
	extends BaseController<CreateAiBotMessageReqBodyDTO, {reply: string}> {
	async getResponse() {
		const response = await AiBotService.ask(
			this.request.body.messages,
			this.request.body.role,
			this.request.body.featureList
		);

		this.response.status(200);
		this.response.send({reply: response});
	}
}
