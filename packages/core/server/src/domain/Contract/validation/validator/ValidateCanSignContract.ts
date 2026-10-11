import {PermissionValidator} from '@copor/core/domain/Core/Validations/Validators/PermissionValidator';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ContractPermission} from '@copor/core/domain/Contract/ContractPermission';

export interface ValidateCanSignContractContext {
	userId: string;
}

export class ValidateCanSignContract extends PermissionValidator<ValidateCanSignContractContext> {
	public getPermissionType(): PermissionType {
		return ContractPermission.canSignContract;
	}
}