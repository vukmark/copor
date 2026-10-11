import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';

export class ValidateCanUpdateContractType extends PermissionValidator {
	public getPermissionType(): PermissionType {
		return ContractPermission.canUpdateContractType;
	}
}
