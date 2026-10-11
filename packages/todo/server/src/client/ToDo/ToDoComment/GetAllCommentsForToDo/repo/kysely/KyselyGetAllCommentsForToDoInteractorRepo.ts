import {GetAllCommentsForToDoRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetAllCommentsForToDoRepo';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyGetAllCommentsForToDoInteractorRepo
	extends TimeTransformer
	implements GetAllCommentsForToDoRepo {
	public async list(toDoId: string): Promise<GetToDoCommentDTO[]> {
		const results = await db
			.selectFrom('toDoComment')
			.select(['id', 'content', 'createdAt', 'toDoId', 'actorId'])
			.where('toDoId', '=', toDoId)
			.orderBy('createdAt', 'desc')
			.execute();

		const commentsResult: GetToDoCommentDTO[] = results.map((comment) => ({
			... comment,
			createdAt: this.fromUtc(comment.createdAt)
		}));

		return commentsResult;
	}
}