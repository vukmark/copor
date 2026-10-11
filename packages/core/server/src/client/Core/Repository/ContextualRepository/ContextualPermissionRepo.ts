import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export abstract class ContextualPermissionRepo<
	RawContext,
	ResolvedContext
> implements PermissionRepository<RawContext> {
	async isAllowed(
		actorId: string,
		permissionType: PermissionType,
		context?: RawContext
	): Promise<boolean> {
		if (!context)
			return false;

		const resolvedContext = await this.resolveContext(context);

		const permission
			= await KyselyPermissionHelper.getPermission(actorId, permissionType);

		if (permission.effect == PermissionEffect.DENY)
			return false;
		switch (permission.scope) {
			case PermissionScope.ALL :
				return true;
			case PermissionScope.OWN :
				return await this.checkOwnPermission(actorId, resolvedContext);
			case PermissionScope.TENANT :
				return await this.checkTenantPermission(actorId, resolvedContext);
		}

		return false;
	}

	abstract checkOwnPermission(actorId: string, context: ResolvedContext): Promise<boolean>;
	abstract checkTenantPermission(actorId: string, context: ResolvedContext): Promise<boolean>;

	protected abstract resolveContext(
		context: RawContext
	): Promise<ResolvedContext>;
}
