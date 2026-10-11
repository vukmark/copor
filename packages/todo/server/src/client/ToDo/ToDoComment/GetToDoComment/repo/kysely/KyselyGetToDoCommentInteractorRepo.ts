import {db} from '@copor/core/client/AppDataSource';
import {GetToDoCommentDTO} from '@copor/todo/domain/ToDo/ToDoComment/interactor/dto/GetToDoCommentDTO';
import {GetToDoCommentRepo} from '@copor/todo/domain/ToDo/ToDoComment/repository/GetToDoCommentRepo';
import {TimeTransformer} from '@copor/core/domain/Core/Date/TimeTransformer';

export class KyselyGetToDoCommentInteractorRepo
	extends TimeTransformer
	implements GetToDoCommentRepo {
	public async load(id: string): Promise<GetToDoCommentDTO> {
		const result = await db
			.selectFrom('toDoComment')
			.selectAll()
			.where('id', '=', id)
			.executeTakeFirst();

		if (!result) {
			throw new Error(`ToDo comment with id ${id} not found`);
		}

		return {
			... result,
			createdAt: this.fromUtc(result.createdAt)
		};
	}
}