import {db} from '@copor/core/client/AppDataSource';
import {
	ValidateCanUpdatePrivateToDoContext
} from '@copor/todo/domain/ToDo/PrivateToDo/validation/validator/ValidateCanUpdatePrivateToDo';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyUpdateToDoValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanUpdatePrivateToDoContext> {
	protected getUserIdFromContext(context: ValidateCanUpdatePrivateToDoContext): Promise<string> {
		return this.getToDoOwnerId(context.toDoId);
	}


	private async getToDoOwnerId(doDoId: string): Promise<string> {
		const row = await db
			.selectFrom('privateToDo')
			.select('actorId')
			.where('id', '=', doDoId)
			.executeTakeFirst();

		if (!row) {
			throw new Error(`ToDo with id ${doDoId} not found`);
		}

		return row.actorId;
	}
}