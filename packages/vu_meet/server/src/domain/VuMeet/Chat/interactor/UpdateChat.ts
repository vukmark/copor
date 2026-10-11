import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';
import {SaveChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/SaveChatRepo';


export class UpdateChat extends ExecuteUseCase<SaveChatDTO, SaveChatRepo, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
