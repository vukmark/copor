import {
	ValidateCanDeletePrivateToDoContext
} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanDeletePrivateToDo';
import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyDeletePrivateToDoValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanDeletePrivateToDoContext> {
	protected getUserIdFromContext(context: ValidateCanDeletePrivateToDoContext): Promise<string> {
		return this.getToDoActorId(context);
	}

	private async getToDoActorId(context: ValidateCanDeletePrivateToDoContext) {
		const toDoActorId = await db
			.selectFrom('privateToDo')
			.select('actorId')
			.where('id', '=', context.toDoId)
			.executeTakeFirst();

		return toDoActorId!.actorId;
	}
}