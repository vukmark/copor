import {ValidateCanEditTagContext} from '@copor/core/domain/Components/Tag/validation/permissions/ValidateCanEditTag';
import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyUpdateTagValidatorPermissionRepo
	extends KyselyUserPermissionRepo<ValidateCanEditTagContext> {
	protected getUserIdFromContext(context: ValidateCanEditTagContext): Promise<string> {
		return this.getTagOwnerId(context.tagId);
	}


	private async getTagOwnerId(tagId: string): Promise<string> {
		const row = await db
			.selectFrom('tag')
			.select('actorId')
			.where('id', '=', tagId)
			.executeTakeFirst();

		if (!row) {
			throw new Error(`Tag with id ${tagId} not found`);
		}

		return row.actorId;
	}
}