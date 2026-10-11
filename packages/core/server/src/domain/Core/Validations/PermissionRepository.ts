import {PermissionType} from '../Permission/PermissionType';

export interface PermissionRepository<TContext = undefined> {
	isAllowed(
		actorId: string,
		permissionType: PermissionType,
		context?: TContext
	): Promise<boolean>;
}