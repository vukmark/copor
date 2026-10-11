import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';
import {SendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/SendTypingStatusRepo';

export class FakeSendChatTypingStatusRepo implements SendTypingStatusRepo {
	send(input: SendTypingStatusDTO): Promise<void> {
		return Promise.resolve();
	}
}
