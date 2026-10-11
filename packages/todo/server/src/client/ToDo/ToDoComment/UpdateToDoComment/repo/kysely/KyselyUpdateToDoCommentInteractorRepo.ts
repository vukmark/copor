import {SaveToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/SaveToDoCommentRepo';
import {SaveToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/SaveToDoCommentDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyUpdateToDoCommentInteractorRepo
	extends TimeTransformer
	implements SaveToDoCommentRepo {
	async save(saveDTO: SaveToDoCommentDTO): Promise<void> {
		await db
			.updateTable('toDoComment')
			.set({
				id: saveDTO.id,
				actorId: saveDTO.actorId,
				toDoId: saveDTO.toDoId,
				createdAt: this.toUtc(saveDTO.createdAt),
				content: saveDTO.content
			})
			.where('id', '=', saveDTO.id)
			.execute();
	}
}