import {
	ValidateCanGetPrivateToDoContext
} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanGetPrivateToDo';
import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyGetPrivateToDoValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanGetPrivateToDoContext> {
	protected getUserIdFromContext(context: ValidateCanGetPrivateToDoContext): Promise<string> {
		return this.getToDoCreatorId(context);
	}


	private async getToDoCreatorId(context: ValidateCanGetPrivateToDoContext) {
		const toDoCreatorId = await db.selectFrom('privateToDo')
			.select('actorId')
			.where('id', '=', context.toDoId)
			.executeTakeFirst();

		return toDoCreatorId!.actorId;
	}
}