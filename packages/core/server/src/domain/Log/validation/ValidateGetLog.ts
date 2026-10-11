import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetLogDTO} from '@copor/core/domain/Log/validation/dto/ValidateGetLogDTO';
import {ValidateGetLogRepo} from '@copor/core/domain/Log/repository/ValidateGetLogRepo';
import {ValidateCanGetLog} from '@copor/core/domain/Log/validation/permissions/ValidateCanGetLog';
import {ValidateLog} from '@copor/core/domain/Core/Validations/Validators/ValidateLog';

export class ValidateGetLog extends ValidationWithPermissionAndRepo<ValidateGetLogDTO, ValidateGetLogRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetLog(this.permissionRepo, this.input.actorId),
			new ValidateLog(this.storageRepo, this.input.logId)
		];
	}
}