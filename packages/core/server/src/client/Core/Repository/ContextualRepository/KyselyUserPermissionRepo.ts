import {ContextualPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/ContextualPermissionRepo';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';


export interface UserPermissionContext {
	userId: string;
}

export abstract class KyselyUserPermissionRepo<Context>
	extends ContextualPermissionRepo<Context, UserPermissionContext> {
	checkOwnPermission(actorId: string, ctx: UserPermissionContext) {
		return Promise.resolve(actorId === ctx.userId);
	}

	async checkTenantPermission(actorId: string, ctx: UserPermissionContext) {
		return KyselyPermissionHelper.isInSameTenant(actorId, ctx.userId);
	}

	protected async resolveContext(
		context: Context
	): Promise<UserPermissionContext> {
		return {
			userId: await this.getUserIdFromContext(context)
		};
	}

	protected abstract getUserIdFromContext(context: Context): Promise<string>;
}
