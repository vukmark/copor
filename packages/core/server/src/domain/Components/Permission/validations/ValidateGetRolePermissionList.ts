import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateRole} from '@copor/core/domain/Core/Validations/Validators/ValidateRole';
import {ValidateCanGetRolePermissionList} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetRolePermissionList';
import {ValidateGetRolePermissionListDTO} from './dto/ValidateGetRolePermissionListDTO';
import {ValidateGetRolePermissionListRepo} from '../repository/ValidateGetRolePermissionListRepo';

export class ValidateGetRolePermissionList
	extends ValidationWithPermissionAndRepo<ValidateGetRolePermissionListDTO, ValidateGetRolePermissionListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRolePermissionList(this.permissionRepo, this.input.actorId),
			new ValidateRole(this.storageRepo, this.input.roleId)
		];
	}
}
