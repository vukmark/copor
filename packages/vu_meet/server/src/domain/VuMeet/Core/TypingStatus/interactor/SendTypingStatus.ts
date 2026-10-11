import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/SendTypingStatusRepo';
import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';

export class SendTypingStatus extends ExecuteUseCase<SendTypingStatusDTO, SendTypingStatusRepo, void> {
	public async execute(): Promise<void> {
		return this.repository.send(this.input);
	}
}
