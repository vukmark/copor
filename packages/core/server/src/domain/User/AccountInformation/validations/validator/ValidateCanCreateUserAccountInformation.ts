import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {InvalidUserIdException} from '@copor/core/domain/Core/Exceptions/invalid/InvalidUserIdException';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

const PERMISSION_TYPE_BY_ROLE: Record<RoleType, PermissionType> = {
	[RoleType.USER]: CorePermission.canCreateUser,
	[RoleType.ADMIN]: CorePermission.canCreateAdminUser
};

export class ValidateCanCreateUserAccountInformation implements Validator {
	private readonly permissionRepository: PermissionRepository;
	private readonly actorId: string;
	private readonly roleType: RoleType;

	constructor(permissionRepository: PermissionRepository, actorId: string, roleType: RoleType) {
		this.permissionRepository = permissionRepository;
		this.actorId = actorId;
		this.roleType = roleType;
	}

	public async validate(): Promise<void> {
		if (!this.actorId) {
			throw new InvalidUserIdException();
		}

		const isAllowed = await this.permissionRepository.isAllowed(
			this.actorId,
			PERMISSION_TYPE_BY_ROLE[this.roleType]
		);

		if (!isAllowed) {
			throw new ForbiddenAccessException();
		}
	}
}
