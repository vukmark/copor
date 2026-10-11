import {SaveToDoCommentDTO} from './dto/SaveToDoCommentDTO';
import {ExecuteUseCase} from '@copor/core/domain/Core/Interactors/ExecuteUseCase';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';

export class UpdateToDoComment extends ExecuteUseCase<SaveToDoCommentDTO, SaveItem<SaveToDoCommentDTO>, void> {
	public async execute(): Promise<void> {
		await this.repository.save(this.input);
	}
}
