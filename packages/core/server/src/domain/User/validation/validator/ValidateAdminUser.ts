import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {ForbiddenAccessException} from '@copor/core/domain/Core/Exceptions/ForbiddenAccessException';
import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';

export class ValidateAdminUser
	extends ValidatorWithRepo<ValidateUpdateAuthUserInformationRepo, string> {
	public async validate(): Promise<void> {
		const roleType = await this.repository.getUserRoleType(this.input!);

		if (roleType !== RoleType.ADMIN) {
			throw new ForbiddenAccessException();
		}
	}
}
