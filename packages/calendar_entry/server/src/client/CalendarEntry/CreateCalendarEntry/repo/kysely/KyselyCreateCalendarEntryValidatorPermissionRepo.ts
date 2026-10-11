import {
	KyselyUserPermissionRepo,
	UserPermissionContext
} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';

export class KyselyCreateCalendarEntryValidatorPermissionRepo
	extends KyselyUserPermissionRepo<UserPermissionContext> {
	protected getUserIdFromContext(context: UserPermissionContext): Promise<string> {
		return Promise.resolve(context.userId);
	}
}
