import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';

export interface SendTypingStatusRepo {
	send(input: SendTypingStatusDTO): Promise<void>;
}
