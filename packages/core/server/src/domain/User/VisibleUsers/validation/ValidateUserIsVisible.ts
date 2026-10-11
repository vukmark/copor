import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {IsUserNotVisibleRepo} from '@copor/core/domain/User/VisibleUsers/repository/IsUserNotVisibleRepo';
import {InvalidUserException} from '@copor/core/domain/User/exception/InvalidUserException';

export interface ValidateUserIsVisibleDTO {
	actorId: string;
	userId: string | undefined;
	permissionType: PermissionType;
	// Must match the picker route's ListVisibleUsers.activeOnly.
	activeOnly: boolean;
}

// The server-side half of a user picker: a user picked from a module's picker
// route must be one that route could have listed. A user outside the scope is
// reported like an unknown one, so the check doesn't reveal who exists.
export class ValidateUserIsVisible extends ValidatorWithRepo<IsUserNotVisibleRepo, ValidateUserIsVisibleDTO> {
	public async validate(): Promise<void> {
		const input = this.input!;

		if (await this.repository.isUserNotVisible(input.actorId, input.userId, input.permissionType, input.activeOnly))
			throw new InvalidUserException();
	}
}
